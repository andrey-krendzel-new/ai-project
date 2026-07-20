import { generateText } from "ai";
import { model } from "../../../../lib/ai";

export async function POST() {
  try {
    const result = await generateText({
      model,
      prompt: "Say hello",
    });

    return Response.json({
      text: result.text,
    });
  } catch (err) {
    console.error(err);

    return Response.json(
      {
        error:
          err instanceof Error
            ? err.message
            : String(err),
      },
      {
        status: 500,
      }
    );
  }
}