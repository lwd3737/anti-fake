export interface VideoDto {
	id: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	channelTitle: string;
	publishedAt: string;
}

export interface SearchVideoChannelDto {
	channelId: string;
	channelTitle: string;
	description: string;
	thumbnailUrl: string;
}

export interface SearchVideosDto {
	nextPageToken: string;
	videos: {
		channelId: string;
		channelTitle: string;
		videoId: string;
		description: string;
		thumbnailUrl: string;
	}[];
}
