// export type WebSearchResult = WebSearchResponse | EvidenceRetrievalError;

import { TokenUsage } from '@/logger/llm-history.logger';

export interface WebSearchResponse {
  contents: WebSearchContent[];
  metadata: WebSearchMetadata;
}

export interface WebSearchMetadata {
  tokenUsage: TokenUsage;
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
