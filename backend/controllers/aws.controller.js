import userModel from "../models/user.model.js";
import { credentials } from "../utils/awsClient.js";
import createAssumedCredentials from "../utils/createAssumedCredentials.js";
import main from "../utils/gemini.js";

export const getAssumedCredentials = async function (req, res) {
  try {
    let { roleArn, externalId, region } = req.body;
    let user = await userModel.findOne({ email: req.user.email });

    if (!roleArn || !externalId || !region) {
      return res
        .status(400)
        .json({ message: "Role Arn and External Id are required" });
    }

    let { accessKeyId, secretAccessKey, sessionToken } =
      await createAssumedCredentials(roleArn, externalId, region);

    if (accessKeyId && secretAccessKey && sessionToken) {
      user.tempAccessKeyId = accessKeyId;
      user.tempSecretAccessKey = secretAccessKey;
      user.tempSessionToken = sessionToken;
      await user.save();

      // ✅ update credentials object directly
      credentials.accessKeyId = accessKeyId;
      credentials.secretAccessKey = secretAccessKey;
      credentials.sessionToken = sessionToken;

      console.log("✅ Credentials updated:", credentials);
    }

    return res.status(200).json({
      message: "AWS Connected Successfully",
      accessKeyId,
      secretAccessKey,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error
          ? error.message
          : "Error in assuming credentials",
    });
  }
};

export const processPrompt = async function (req, res) {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    let { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    user.prompts.push(prompt);
    await user.save();

    let aiResponse = await main(prompt);

    return res.status(200).json({ aiResponse });
  } catch (error) {
    return res.status(500).json({
      message:
        error instanceof Error ? error.message : "Error in processing prompt",
    });
  }
};
