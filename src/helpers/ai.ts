import loadConfig from "@/config";
import { createOpenAI } from "@ai-sdk/openai";

export enum AIModel {
	GPT_4O = "gpt-4o",
	GPT_4O_MINI = "gpt-4o-mini",
	GEMINI_1_5_FLASH = "gemini-1.5-flash",
}

export const openai = createOpenAI({
	apiKey: loadConfig().openai.apiKey,
});
