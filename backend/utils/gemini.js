import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { toolDeclarations, toolHandlers } from "../tools/index.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main(prompt) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
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
    console.error("🚨 [Unhandled Error in main()]", error);
    return `Error: ${error.message}`;
  }
}

export default main;
