import loadConfig from "@/config";
import { openai } from "@ai-sdk/openai";
import { LanguageModel } from "ai";

export type AIModel = "gpt-4o" | "gpt-4o-mini";

export const createAIModel = (modelName?: string): LanguageModel => {
	const {
		openai: { gptModel },
	} = loadConfig();
	return modelName ? openai(modelName) : openai(gptModel);
};
