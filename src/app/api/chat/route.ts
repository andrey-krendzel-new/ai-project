import { NextResponse } from "next/server";
import { generateText } from "ai";
import { model } from "../../../../lib/ai";
import { SYSTEM_PROMPT } from "../../../../lib/systemPrompt";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const result = await generateText({
      model,
      system: SYSTEM_PROMPT,
      prompt: message,
    });

    return NextResponse.json({
      response: result.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}