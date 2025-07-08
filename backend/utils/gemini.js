import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { toolDeclarations, toolHandlers } from "../tools/index.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main(prompt, retries = 5, backoff = 1000) {
  let attempt = 0;

  while (attempt < retries) {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro-latest",
        tools: [{ functionDeclarations: toolDeclarations }],
        functionCallingConfig: { mode: "ANY" },
      });

      const chat = model.startChat({});

      const first = await chat.sendMessage(prompt);

      const call = first.response.functionCalls?.()?.[0] ?? null;

      // If Gemini didn't call any function, return normal response
      if (!call) {
        const answer = first.response.text();

        return answer;
      }

      const handler = toolHandlers[call.name];
      if (!handler) {
        const errorMsg = `No handler found for tool "${call.name}"`;
        console.error("❌", errorMsg);
        return errorMsg;
      }

      const result = await handler(call.args);

      if (result?.state === "error") {
        console.error("🛑 AWS Error →", result.message);
        return `AWS ERROR: ${result.message}`;
      }

      const second = await chat.sendMessage([
        { functionResponse: { name: call.name, response: result } },
      ]);

      const finalAnswer = second.response.text();

      return finalAnswer;
    } catch (error) {
      if (error.status === 503 && attempt < retries - 1) {
        const wait = backoff * Math.pow(2, attempt);
        console.warn(`⚠️ Model overloaded (503). Retrying in ${wait}ms...`);
        await delay(wait);
        attempt++;
      } else {
        console.error("🚨 [Unhandled Error in main()]", error);
        return `Error: ${error.message}`;
      }
    }
  }
}

export default main;
