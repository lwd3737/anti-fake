import { Config } from "@/config";
import { google, youtube_v3 } from "googleapis";

export interface SearchChannelResult {
	channelId: string;
	channelTitle: string;
	description: string;
	thumbnailUrl: string;
}

export interface SearchVideosResult {
	nextPageToken: string;
	videos: {
		channelId: string;
		channelTitle: string;
		videoId: string;
		description: string;
		thumbnailUrl: string;
	}[];
}

export default class YoutubeService {
	private youtube: youtube_v3.Youtube;

	constructor(config: Pick<Config, "google">) {
		this.youtube = google.youtube({
			version: "v3",
			auth: config.google.apiKey,
		});
	}

	public async searchChannel(name: string): Promise<SearchChannelResult[]> {
		const res = await this.youtube.search.list({
			part: ["snippet"],
			type: ["channel"],
			q: name,
		});

		if (res.status >= 400) {
			throw new Error(`Youtube channel search is failed: ${res.statusText}`);
		}

		return (
			res.data.items?.map((item) => {
				const { channelId, channelTitle, description, thumbnails } =
					item.snippet!;
				return {
					channelId: channelId!,
					channelTitle: channelTitle!,
					description: description!,
					thumbnailUrl: thumbnails!.default!.url!,
				};
			}) ?? []
		);
	}

	public async searchVideos(
		keyword: string,
		options?: {
			channelId: string;
			nextPageToken: string;
			dateRange: { startDate: string; endDate: string };
		},
	): Promise<SearchVideosResult> {
		const res = await this.youtube.search.list({
			part: ["id"],
			channelId: options?.channelId,
			type: ["video"],
			q: keyword,
			maxResults: 10,
			pageToken: options?.nextPageToken,
			publishedBefore: options?.dateRange?.endDate,
			publishedAfter: options?.dateRange?.startDate,
		});

		if (res.status >= 400) {
			throw new Error(`Youtube video search is failed: ${res.statusText}`);
		}

		const videos =
			res.data.items?.map((item) => {
				const {
					channelId,
					channelTitle,
					description,
					thumbnails,
					publishedAt,
				} = item.snippet!;
				return {
					channelId: channelId!,
					channelTitle: channelTitle!,
					videoId: item.id!.videoId!,
					description: description!,
					thumbnailUrl: thumbnails!.default!.url!,
					publishedAt: publishedAt!,
				};
			}) ?? [];

		return {
			nextPageToken: res.data.nextPageToken!,
			videos,
		};
	}
}
