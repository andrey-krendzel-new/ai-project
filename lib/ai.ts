import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { google } from "@ai-sdk/google";

export const model = google("gemini-3-flash-preview");
// export const google = createGoogleGenerativeAI({
//   apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
// });