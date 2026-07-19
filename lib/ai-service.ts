import { generateText } from "ai";
import { streamText } from "ai";
import { google } from "./ai";
import { researchPrompt } from "../components/prompts/research";

export async function generateResearchResponse(question: string) {
  const result = await streamText({
    model: google("gemini-3-flash-preview"),
    prompt: `
${researchPrompt}

Question:
${question}
    `,
  });

  return result.text;
}