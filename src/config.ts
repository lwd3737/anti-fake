export type Config = ReturnType<typeof loadConfig>;

export default function loadConfig() {
	const { OPENAI_API_KEY, GPT_MODEL, GOOGLE_API_KEY } = process.env;

	if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is required");
	if (!GPT_MODEL) throw new Error("GPT_MODEL is required");
	if (!GOOGLE_API_KEY) throw new Error("GOOGLE_API_KEY is required");

	return {
		openai: {
			apiKey: OPENAI_API_KEY,
			gptModel: GPT_MODEL,
		},
		google: {
			apiKey: GOOGLE_API_KEY,
		},
	};
}
