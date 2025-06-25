import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";

async function createAssumedCredentials(roleArn, externalId, region) {
  const client = new STSClient({ region });

  const command = new AssumeRoleCommand({
    RoleArn: roleArn,
    RoleSessionName: `user-session-${Date.now()}`,
    ExternalId: externalId,
    DurationSeconds: 3600, // 1 hour
  });

  const response = await client.send(command);

  return {
    accessKeyId: response.Credentials.AccessKeyId,
    secretAccessKey: response.Credentials.SecretAccessKey,
    sessionToken: response.Credentials.SessionToken,
    expiration: response.Credentials.Expiration,
  };
}

export default createAssumedCredentials
