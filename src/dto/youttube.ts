export interface VideoDto {
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
