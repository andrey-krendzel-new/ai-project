import { generateText } from "ai";
import { model } from "@/lib/ai";
import { SYSTEM_PROMPT } from "@/lib/systemPrompt";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const result = await generateText({
      model,
      system: SYSTEM_PROMPT,
      prompt: message,
    });

    return Response.json({
      response: result.text,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error: String(err),
      },
      { status: 500 }
    );
  }
}