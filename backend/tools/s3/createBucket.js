import {
  S3Client,
  CreateBucketCommand,
} from "@aws-sdk/client-s3";
import { getAwsClient } from "../../utils/awsClient.js";

/* ─────────────────────────────────────────────
 * 1️⃣  Function Declaration for Gemini
 * ───────────────────────────────────────────── */
export const functionDeclaration = {
  name: "createS3Bucket",
  description:
    "Create a new S3 bucket. If bucketName is omitted, the tool will generate a unique name.",
  parameters: {
    type: "object",
    properties: {
      region:     { type: "string", description: "AWS region (e.g. us-east-1)" },
      bucketName: {
        type: "string",
        description:
          "Globally unique bucket name. Optional—leave empty to auto-generate.",
        default: "",
      },
    },
    required: ["region"],        // bucketName no longer required
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

/* ─────────────────────────────────────────────
 * 2️⃣  Helper: generate bucket name
 * ───────────────────────────────────────────── */
function generateBucketName() {
  const date   = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
  const random = Math.random().toString(36).substring(2, 8);
  return `gemini-bucket-${date}-${random}`;
}

/* ─────────────────────────────────────────────
 * 3️⃣  Handler
 * ───────────────────────────────────────────── */
export const handler = async ({ region, bucketName = "" }) => {
  const s3 = getAwsClient(S3Client, region);

  // us-east-1 special case (no LocationConstraint)
  const toCmdInput = (name) =>
    region === "us-east-1"
      ? { Bucket: name }
      : { Bucket: name, CreateBucketConfiguration: { LocationConstraint: region } };

  let name = bucketName.trim();
  let attempts = 0;

  while (attempts < 5) {
    if (!name) name = generateBucketName();

    try {
      await s3.send(new CreateBucketCommand(toCmdInput(name)));
      return {
        bucketName: name,
        state: "ok",
        message: `✅ Bucket "${name}" created in ${region}`,
      };
    } catch (err) {
      // Collision or other error
      if (
        err.name === "BucketAlreadyOwnedByYou" ||
        err.name === "BucketAlreadyExists"
      ) {
        name = "";              // force new name next loop
        attempts += 1;
        continue;
      }
      return { bucketName: name, state: "error", message: `AWS ERROR: ${err.message}` };
    }
  }

  return {
    bucketName: "",
    state: "error",
    message: "Failed to generate a unique bucket name after multiple attempts.",
  };
};

export default { functionDeclaration, handler };
