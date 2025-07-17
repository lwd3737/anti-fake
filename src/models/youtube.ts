export interface YoutubeVideo {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  thumbnailUrl: string;
  transcript?: string;
  transcriptSummary?: string;
  publishedAt: Date;
}

export interface YoutubeVideoTranscript {
  text: string;
  duration: number;
  segments: {
    start: number;
    end: number;
    text: string;
  }[];
}
