export interface VideoDto {
	id: string;
	title: string;
	description: string;
	thumbnail: {
		url: string;
		width: number;
		height: number;
	};
	channelTitle: string;
	publishedAt: string;
}

export interface SearchVideoChannelDto {
	channelId: string;
	channelTitle: string;
	description: string;
	thumbnail: {
		url: string;
		width: number;
		height: number;
	};
}

export interface SearchVideosDto {
	nextPageToken: string;
	videos: {
		channelId: string;
		channelTitle: string;
		videoId: string;
		description: string;
		thumbnail: {
			url: string;
			width: number;
			height: number;
		};
	}[];
}
