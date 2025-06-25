import {
  S3Client,
  DeleteBucketCommand,
} from "@aws-sdk/client-s3";
import { getAwsClient } from "../../utils/awsClient.js";

export const functionDeclaration = {
  name: "deleteS3Bucket",
  description: "Delete an empty S3 bucket",
  parameters: {
    type: "object",
    properties: {
      region:     { type: "string", description: "AWS region" },
      bucketName: { type: "string", description: "Bucket to delete" },
    },
    required: ["region", "bucketName"],
  },
  response: {
    type: "object",
    properties: {
      bucketName: { type: "string" },
      state:      { type: "string" },
      message:    { type: "string" },
    },
    required: ["state", "message"],
  },
};

export const handler = async ({ region, bucketName }) => {
  const s3 = getAwsClient(S3Client, region);

  try {
    await s3.send(new DeleteBucketCommand({ Bucket: bucketName }));
    return {
      bucketName,
      state: "ok",
      message: `🗑️ Bucket "${bucketName}" deleted.`,
    };
  } catch (err) {
    return { bucketName, state: "error", message: `AWS ERROR: ${err.message}` };
  }
};

export default { functionDeclaration, handler };
