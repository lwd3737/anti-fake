import loadConfig from "@/config";
import { openai } from "@ai-sdk/openai";
import { LanguageModel } from "ai";

export type AIModel = "gpt-4o" | "gpt-4o-mini" | "gemini-1.5-flash";

export const createAIModel = (model?: AIModel): LanguageModel => {
	const {
		openai: { gptModel },
	} = loadConfig();
	return model ? openai(model) : openai(gptModel);
};
