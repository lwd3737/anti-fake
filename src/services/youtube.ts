import loadConfig, { Config } from "@/config";
import { SearchChannelDto, SearchVideosDto, VideoDto } from "@/dto/youttube";
import { GaxiosResponse } from "gaxios";
import { google, youtube_v3 } from "googleapis";

export default class YoutubeService {
	private youtube: youtube_v3.Youtube;

	public static create() {
		const config = loadConfig();
		return new YoutubeService({ google: config.google });
	}

	constructor(config: Pick<Config, "google">) {
		this.youtube = google.youtube({
			version: "v3",
			auth: config.google.apiKey,
		});
	}

	public async getVideo(id: string): Promise<VideoDto> {
		const res = await this.youtube.videos.list({
			part: ["id", "snippet"],
			id: [id],
		});
		if (this.isFailed(res)) {
			throw new Error(`Youtube video search is failed: ${res.statusText}`);
		}

		const video = res.data.items?.map((item) => {
			const { title, description, thumbnails, channelTitle } = item.snippet!;
			return {
				id: item.id!,
				title: title!,
				description: description!,
				thumbnailUrl: thumbnails!.default!.url!,
				channelTitle: channelTitle!,
			};
		})[0];
		if (!video) {
			throw new Error(`Youtube video not found: ${id}`);
		}

		return video;
	}

	public async downloadCaption(videoId: string) {
		const res = await this.youtube.captions.list({
			part: ["id"],
			videoId,
		});
		if (this.isFailed(res)) {
			throw new Error(`Youtube caption list is failed: ${res.statusText}`);
		}

		const trackIds = res.data.items!.map((item) => {
			return item!.id!;
		})[0];

		console.log("trackids", trackIds);

		let caption: ArrayBuffer;
		for (const trackId of trackIds) {
			const res = await this.youtube.captions.download({
				id: trackId,
			});
			if (this.isFailed(res)) continue;
			console.log("res", res.data);
			return res.data as ArrayBuffer;
		}

		throw new Error(`Youtube caption download is failed: ${videoId}`);
	}

	public async searchChannel(name: string): Promise<SearchChannelDto[]> {
		const res = await this.youtube.search.list({
			part: ["snippet"],
			type: ["channel"],
			q: name,
		});

		if (this.isFailed(res)) {
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
	): Promise<SearchVideosDto> {
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

		if (this.isFailed(res)) {
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

	private isFailed(res: GaxiosResponse): boolean {
		return res.status >= 400;
	}
}
