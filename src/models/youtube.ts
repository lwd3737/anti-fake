export interface YoutubeVideo {
  id: string;
  title: string;
  channelId: string;
  channelTitle: string;
  thumbnailUrl: string;
  transcript?: string;
  publishedAt: Date;
}

export interface YoutubeVideoTranscription {
  task: string;
  language: string;
  text: string;
  duration: number;
  segments: {
    id: string;
    start: number;
    end: number;
    text: string;
    tokens: number[];
    temperature: number;
    avg_logprob: number;
    compression_ratio: number;
    no_speech_prob: number;
  }[];
}
