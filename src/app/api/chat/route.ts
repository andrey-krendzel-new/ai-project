import { streamText } from "ai";
import { model } from "../../../../lib/ai";
import { SYSTEM_PROMPT } from "../../../../lib/systemPrompt";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

const result = streamText({
  model,
  system: SYSTEM_PROMPT,
  prompt: message,
});

return result.toTextStreamResponse();

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}