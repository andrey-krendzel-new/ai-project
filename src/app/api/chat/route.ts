import { streamText } from "ai";
import { google } from "../../../../lib/ai";
import { researchPrompt } from "../../../../components/prompts/research";

export async function POST(request: Request) {
  const body = await request.json();

  const result = streamText({
    model: google("gemini-3-flash-preview"),
    prompt: `
${researchPrompt}

Question:
${body.message}
`,
  });

  return result.toTextStreamResponse();
}