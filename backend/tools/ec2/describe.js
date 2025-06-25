import { DescribeInstancesCommand } from "@aws-sdk/client-ec2";
import { getAwsClient } from "../../utils/awsClient.js";

export const functionDeclaration = {
  name: "describeEC2Instance",
  description: "Return state & key metadata for a single EC2 instance",
  parameters: {
    type: "object",
    properties: {
      region:     { type: "string", description: "AWS region" },
      instanceId: { type: "string", description: "Single EC2 instance ID" }
    },
    required: ["region", "instanceId"]
  },
  response: {
    type: "object",
    properties: {
      state:     { type: "string" },
      type:      { type: "string" },
      publicIp:  { type: "string" },
      launchTime:{ type: "string" },
      message:   { type: "string" }
    },
    required: ["state", "message"]
  }
};

export const handler = async ({ region, instanceId }) => {
  if (!instanceId) {
    return { state: "error", message: "instanceId is required" };
  }

  const { EC2Client } = await import("@aws-sdk/client-ec2");
  const ec2 = getAwsClient(EC2Client, region);

  try {
    const res = await ec2.send(
      new DescribeInstancesCommand({ InstanceIds: [instanceId] })
    );
    const inst = res.Reservations?.[0]?.Instances?.[0];
    if (!inst) {
      return { state: "error", message: `Instance ${instanceId} not found` };
    }
    return {
      state:      inst.State.Name,
      type:       inst.InstanceType,
      publicIp:   inst.PublicIpAddress ?? "N/A",
      launchTime: inst.LaunchTime,
      message:    `Instance ${instanceId} is ${inst.State.Name}`
    };
  } catch (err) {
    return { state: "error", message: err.message };
  }
};

export default { functionDeclaration, handler };
