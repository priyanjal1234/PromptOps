import {
  EC2Client,
  TerminateInstancesCommand,
  DescribeInstancesCommand,
} from "@aws-sdk/client-ec2";
import { getAwsClient } from "../../utils/awsClient.js";

/* ─────────────────────────────────────────────
 * 1️⃣ Gemini Function Declaration
 * ───────────────────────────────────────────── */
export const functionDeclaration = {
  name: "terminateEC2Instances",
  description: "Terminate one or more EC2 instances",
  parameters: {
    type: "object",
    properties: {
      region: {
        type: "string",
        description: "AWS region (e.g., us-east-1)",
      },
      instanceIds: {
        type: "array",
        items: { type: "string" },
        description:
          "List of EC2 instance IDs to terminate. Leave empty or omit to terminate all instances in the region.",
        default: [],
      },
    },
    required: ["region"],
  },
  response: {
    type: "object",
    properties: {
      terminated: { type: "array", items: { type: "string" } },
      state: { type: "string" },
      message: { type: "string" },
    },
    required: ["state", "message"],
  },
};

/* ─────────────────────────────────────────────
 * 2️⃣ List All Non-Terminated Instance IDs
 * ───────────────────────────────────────────── */
async function listTerminatableInstanceIds(region) {
  const ec2 = getAwsClient(EC2Client, region);
  const result = await ec2.send(new DescribeInstancesCommand({}));

  const instanceIds = [];

  for (const res of result.Reservations || []) {
    for (const inst of res.Instances || []) {
      const state = inst.State?.Name;
      if (state !== "terminated" && state !== "shutting-down") {
        instanceIds.push(inst.InstanceId);
      }
    }
  }

  return instanceIds;
}

/* ─────────────────────────────────────────────
 * 3️⃣ Handler
 * ───────────────────────────────────────────── */
export const handler = async ({ region, instanceIds = [] }) => {
  const ec2 = getAwsClient(EC2Client, region);

  try {
    let idsToTerminate = instanceIds;

    // If no specific IDs provided, list all
    if (!Array.isArray(idsToTerminate) || idsToTerminate.length === 0) {
      idsToTerminate = await listTerminatableInstanceIds(region);
    }

    if (idsToTerminate.length === 0) {
      return {
        terminated: [],
        state: "ok",
        message: "✅ No running/stoppable instances found to terminate.",
      };
    }

    const result = await ec2.send(
      new TerminateInstancesCommand({ InstanceIds: idsToTerminate })
    );

    const terminated = (result.TerminatingInstances || []).map(
      (inst) => inst.InstanceId
    );

    return {
      terminated,
      state: "ok",
      message: `🗑️ Termination initiated for ${terminated.length} instance(s).`,
    };
  } catch (err) {
    return {
      terminated: [],
      state: "error",
      message: `AWS ERROR: ${err.message}`,
    };
  }
};

export default { functionDeclaration, handler };
