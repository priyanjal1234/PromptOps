import dotenv from "dotenv";
dotenv.config();

export const credentials = {
  accessKeyId: "",
  secretAccessKey: "",
  sessionToken: "",
};


export function getDynamicCredentialsProvider() {
  return async () => {
    if (!credentials.accessKeyId || !credentials.secretAccessKey || !credentials.sessionToken) {
      throw new Error("AWS credentials not set");
    }
    return {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken,
    };
  };
}


export const getAwsClient = (Client, region) =>
  new Client({
    region,
    credentials: getDynamicCredentialsProvider(),
  });
