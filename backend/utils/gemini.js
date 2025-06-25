import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { toolDeclarations, toolHandlers } from "../tools/index.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function main(prompt) {
  try {
    console.log("\n🟨 [PROMPT] →", prompt);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      tools: [{ functionDeclarations: toolDeclarations }],
      functionCallingConfig: { mode: "ANY" },
    });

    const chat = model.startChat({});

    const first = await chat.sendMessage(prompt);

    console.log("\n📩 [Gemini Raw Initial Response]");
    console.dir(first.response, { depth: null });

    const call = first.response.functionCalls?.()?.[0] ?? null;

    // If Gemini didn't call any function, return normal response
    if (!call) {
      const answer = first.response.text();
      console.log("\n🟢 [Final Answer - No Tool Call]");
      console.log(answer);
      return answer;
    }

    console.log("\n🔧 [Function Call Detected]");
    console.log("Function Name:", call.name);
    console.log("Arguments:", call.args);

    const handler = toolHandlers[call.name];
    if (!handler) {
      const errorMsg = `No handler found for tool "${call.name}"`;
      console.error("❌", errorMsg);
      return errorMsg;
    }

    const result = await handler(call.args);

    console.log("\n📦 [Handler Response]");
    console.dir(result, { depth: null });

    if (result?.state === "error") {
      console.error("🛑 AWS Error →", result.message);
      return `AWS ERROR: ${result.message}`;
    }

    const second = await chat.sendMessage([
      { functionResponse: { name: call.name, response: result } },
    ]);

    console.log("\n📨 [Gemini Final Response]");
    console.dir(second.response, { depth: null });

    const finalAnswer = second.response.text();
    console.log("\n✅ [Final Answer]");
    console.log(finalAnswer);

    return finalAnswer;
  } catch (error) {
    console.error("🚨 [Unhandled Error in main()]", error);
    return `Error: ${error.message}`;
  }
}

export default main;
