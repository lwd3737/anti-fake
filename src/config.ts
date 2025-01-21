export type Config = ReturnType<typeof loadConfig>;

export default function loadConfig() {
	const {
		BASE_URL,
		OPENAI_API_KEY,
		GPT_MODEL,
		GOOGLE_API_KEY,
		GOOGLE_CLIENT_ID,
		GOOGLE_SECRET_KEY,
		GOOGLE_REDIRECT_URL,
		GOOGLE_CUSTOM_SEARCH_API_KEY,
		GOOGLE_SEARCH_ENGINE_ID,
		GEMINI_API_KEY,
		DEV_MODE,
	} = process.env;

	if (!BASE_URL) throw new Error("BASE_URL is required");
	if (!OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is required");
	if (!GPT_MODEL) throw new Error("GPT_MODEL is required");
	if (!GOOGLE_API_KEY) throw new Error("GOOGLE_API_KEY is required");
	if (!GOOGLE_CLIENT_ID) throw new Error("GOOGLE_CLIENT_ID is required");
	if (!GOOGLE_SECRET_KEY) throw new Error("GOOGLE_SECRET_KEY is required");
	if (!GOOGLE_REDIRECT_URL) throw new Error("GOOGLE_REDIRECT_URL is required");
	if (!GOOGLE_CUSTOM_SEARCH_API_KEY)
		throw new Error("GOOGLE_CUSTOM_SEARCH_API_KEY is required");
	if (!GOOGLE_SEARCH_ENGINE_ID)
		throw new Error("GOOGLE_SEARCH_ENGINE_ID is required");
	if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is required");

	return {
		nodeEnv: process.env.NODE_ENV,
		baseUrl: BASE_URL,
		devMode: DEV_MODE === "true",
		openai: {
			apiKey: OPENAI_API_KEY,
			gptModel: GPT_MODEL,
		},
		google: {
			apiKey: GOOGLE_API_KEY,
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_SECRET_KEY,
			redirectUrl: GOOGLE_REDIRECT_URL,
			customSearchApiKey: GOOGLE_CUSTOM_SEARCH_API_KEY,
			searchEngineId: GOOGLE_SEARCH_ENGINE_ID,
			gemini: {
				apiKey: GEMINI_API_KEY,
			},
		},
	};
}
