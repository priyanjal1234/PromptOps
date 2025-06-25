import { StartInstancesCommand } from "@aws-sdk/client-ec2";
import { getAwsClient } from "../../utils/awsClient.js";

export const functionDeclaration = {
  name: "startEC2Instances",
  description: "Start one or more stopped EC2 instances",
  parameters: {
    type: "object",
    properties: {
      region:      { type: "string", description: "AWS region" },
      instanceIds: {
        type: "array",
        items: { type: "string" },
        description: "Array of EC2 instance IDs to start"
      }
    },
    required: ["region", "instanceIds"]
  },
  response: {
    type: "object",
    properties: {
      started:  { type: "array", items: { type: "string" } },
      state:    { type: "string" },
      message:  { type: "string" }
    },
    required: ["state", "message"]
  }
};

export const handler = async ({ region, instanceIds }) => {
  if (!Array.isArray(instanceIds) || instanceIds.length === 0) {
    return { started: [], state: "error", message: "instanceIds must be a non-empty array" };
  }

  const { EC2Client } = await import("@aws-sdk/client-ec2");
  const ec2 = getAwsClient(EC2Client, region);

  try {
    await ec2.send(new StartInstancesCommand({ InstanceIds: instanceIds }));
    return {
      started: instanceIds,
      state: "ok",
      message: `✅ Start initiated for ${instanceIds.length} instance(s)`
    };
  } catch (err) {
    return { started: [], state: "error", message: err.message };
  }
};

export default { functionDeclaration, handler };
