export interface FactCheckSession {
  id: string;
  userId: string;
  contentType: ContentType;
  contentId: string;
  createdAt: Date;
}

export enum ContentType {
  YOUTUBE_VIDEO = 'YOUTUBE_VIDEO',
}
