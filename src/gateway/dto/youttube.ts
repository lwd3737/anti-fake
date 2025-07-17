export interface YoutubeVideoDto {
  id: string;
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
  publishedAt: string;
}

export interface SearchYoutubeVideoChannelDto {
  channelId: string;
  channelTitle: string;
  description: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
}

export interface SearchYoutubeVideosDto {
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
