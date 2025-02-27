import loadConfig, { Config } from "@/config";
import {
	SearchVideoChannelDto,
	SearchVideosDto,
	VideoDto,
} from "@/dto/youttube";
import { GaxiosResponse } from "gaxios";
import { Auth, google, youtube_v3 } from "googleapis";
import GoogleAuth from "./google-auth";
import { YoutubeTranscript } from "youtube-transcript";

export default class YoutubeService {
	private youtube: youtube_v3.Youtube;

	public static create(googleAuth?: GoogleAuth): YoutubeService {
		return new YoutubeService(
			googleAuth ? googleAuth.client : { google: loadConfig().google },
		);
	}

	public static async getSubtitle(videoId: string): Promise<string> {
		const { devMode, YOUTUBE_SUBTITLE_DOWNLOAD_DEV_MODE: useMockSubtitle } =
			loadConfig();
		if (useMockSubtitle || devMode) {
			const mock = await import("/mock/subtitle.json");
			return mock.subtitle;
		}

		const transcripts = await YoutubeTranscript.fetchTranscript(videoId);
		return transcripts.reduce(
			(transcript, segment) => transcript + segment.text,
			"",
		);
	}

	constructor(config: Pick<Config, "google"> | Auth.OAuth2Client) {
		const auth =
			config instanceof Auth.OAuth2Client ? config : config.google.apiKey;
		this.youtube = google.youtube({
			version: "v3",
			auth,
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

	public async searchChannel(name: string): Promise<SearchVideoChannelDto[]> {
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
