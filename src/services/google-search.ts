import { customsearch, customsearch_v1 } from "@googleapis/customsearch";
import GoogleAuth from "./google-auth";
import loadConfig, { Config } from "@/config";
import { GoogleSearchDto, GoogleSearchItemDto } from "@/dto/google-search";

export default class GoogleSearchService {
	private searchEngineId: string;
	private search: customsearch_v1.Customsearch;

	public static create(): GoogleSearchService {
		const config = loadConfig();
		const { apiKey, searchEngineId } = config.google;
		return new GoogleSearchService({ apiKey, searchEngineId });
	}

	constructor(config: Pick<Config["google"], "apiKey" | "searchEngineId">) {
		// const auth = GoogleAuth.create()
		this.searchEngineId = config.searchEngineId;
		this.search = customsearch({
			version: "v1",
			auth: config.apiKey,
		});
	}

	public async list(
		query: string,
		options?: { count?: number },
	): Promise<GoogleSearchDto> {
		const res = await this.search.cse.list({
			cx: this.searchEngineId,
			q: query,
			num: options?.count ?? 10,
		});

		const items = res.data.items?.map((item) => {
			const { title, link } = item as GoogleSearchItemDto;
			return { title, link };
		});

		return { items: items ?? [] };
	}
}
