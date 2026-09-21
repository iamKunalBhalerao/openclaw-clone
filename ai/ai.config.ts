import "dotenv/config";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export function getAgentModel() {
  if (
    !process.env.OPENROUTER_API_KEY ||
    !process.env.OPENROUTER_DEFAULT_MODEL
  ) {
    console.error(
      "Missing env vars: OPENROUTER_API_KEY and OPENROUTER_DEFAULT_MODEL",
    );
    process.exit(1);
  }

  const provider = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  return provider(process.env.OPENROUTER_DEFAULT_MODEL);
}
