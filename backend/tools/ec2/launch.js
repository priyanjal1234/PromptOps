import { RunInstancesCommand } from "@aws-sdk/client-ec2";
import { getAwsClient } from "../../utils/awsClient.js";

const UBUNTU_AMI_22 = {
  "us-east-1": "ami-0d016af584f4febe3",
  "us-east-2": "ami-085438ce84ab3ac76",
  "us-west-1": "ami-01324c2b5f42047d7",
  "us-west-2": "ami-0f6d76bf212f00b86"
};

export const functionDeclaration = {
  name: "launchEC2Instance",
  description: "Launch one or more Ubuntu 22.04 LTS EC2 instances",
  parameters: {
    type: "object",
    properties: {
      region: { type: "string" },
      instanceType: { type: "string", default: "t2.micro" },
      count: { type: "number", default: 1 },
      amiId: { type: "string", description: "Optional custom AMI ID" },
    },
    required: ["region"],
  },
  response: {
    type: "object",
    properties: {
      instanceIds: { type: "array", items: { type: "string" } },
      state: { type: "string" },
      message: { type: "string" },
    },
    required: ["state", "message"],
  },
};

export const handler = async ({
  region,
  instanceType = "t2.micro",
  count = 1,
  amiId,
}) => {
  const { EC2Client } = await import("@aws-sdk/client-ec2");
  const ec2 = getAwsClient(EC2Client, region);
  const imageId = amiId || UBUNTU_AMI_22[region] || UBUNTU_AMI_22["us-east-1"];

  const cmd = new RunInstancesCommand({
    ImageId: imageId,
    InstanceType: instanceType,
    MinCount: 1,
    MaxCount: count,
    TagSpecifications: [
      {
        ResourceType: "instance",
        Tags: [{ Key: "Name", Value: "gemini-ubuntu" }],
      },
    ],
  });

  try {
    const res = await ec2.send(cmd);
    const ids = res.Instances.map((i) => i.InstanceId);
    return {
      instanceIds: ids,
      state: "ok",
      message: `Launched ${ids.length} Ubuntu 22.04 ${instanceType} instance(s)`,
    };
  } catch (err) {
    return { instanceIds: [], state: "error", message: err.message };
  }
};

export default { functionDeclaration, handler };
