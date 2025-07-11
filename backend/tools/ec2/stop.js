import {
  EC2Client,
  DescribeInstancesCommand,
  StopInstancesCommand,
} from "@aws-sdk/client-ec2";
import { getAwsClient } from "../../utils/awsClient.js";

/* ─────────────────────────────────────────────
 * 1️⃣ Gemini-compatible function declaration
 * ───────────────────────────────────────────── */
export const functionDeclaration = {
  name: "stopEC2Instances",
  description: "Stop one or more running EC2 instances",
  parameters: {
    type: "object",
    properties: {
      region: {
        type: "string",
        description: "AWS region (e.g., us-east-1)",
      },
      instanceIds: {
        type: "array",
        description:
          "List of EC2 instance IDs to stop. If empty or omitted, all instances in the region will be stopped.",
        items: { type: "string" },
        default: [],
      },
    },
    required: ["region"],
  },
  response: {
    type: "object",
    properties: {
      stopped: { type: "array", items: { type: "string" } },
      state: { type: "string" },
      message: { type: "string" },
    },
    required: ["state", "message"],
  },
};

/* ─────────────────────────────────────────────
 * 2️⃣ Helper: fetch all EC2 instance IDs
 * ───────────────────────────────────────────── */
async function listAllInstanceIds(region) {
  const ec2 = getAwsClient(EC2Client, region);

  const result = await ec2.send(new DescribeInstancesCommand({}));
  const instanceIds = [];

  for (const res of result.Reservations || []) {
    for (const inst of res.Instances || []) {
      if (inst.State.Name === "running") {
        instanceIds.push(inst.InstanceId);
      }
    }
  }

  return instanceIds;
}


/* ─────────────────────────────────────────────
 * 3️⃣ Handler logic
 * ───────────────────────────────────────────── */
export const handler = async ({ region, instanceIds = [] }) => {
  const ec2 = getAwsClient(EC2Client, region);

  try {
    let idsToStop = instanceIds;

    // If empty, get all instance IDs
    if (!Array.isArray(idsToStop) || idsToStop.length === 0) {
      idsToStop = await listAllInstanceIds(region);
    }

    if (idsToStop.length === 0) {
      return {
        stopped: [],
        state: "ok",
        message: "✅ No instances found to stop.",
      };
    }

    await ec2.send(new StopInstancesCommand({ InstanceIds: idsToStop }));

    return {
      stopped: idsToStop,
      state: "ok",
      message: `🛑 Stop initiated for ${idsToStop.length} instance(s).`,
    };
  } catch (err) {
    return {
      stopped: [],
      state: "error",
      message: `${err.message}`,
    };
  }
};

export default { functionDeclaration, handler };
