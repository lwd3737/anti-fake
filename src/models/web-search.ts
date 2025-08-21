import { LanguageModelUsage } from 'ai';

export interface WebSearchResponse {
  contents: WebSearchContent[];
  metadata: WebSearchMetadata;
}

export interface WebSearchMetadata {
  tokenUsage: LanguageModelUsage;
  model: string;
}

export interface WebSearchContent {
  summary: string;
  citations: WebSearchCitation[];
}

export interface WebSearchCitation {
  title: string;
  url: string;
  description?: string;
  imageUrl?: string;
  siteName: string;
}
