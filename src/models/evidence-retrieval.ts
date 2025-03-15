export type EvidenceRetrievalResult = Evidence | EvidenceRetrievalError;

export interface Evidence {
	summaries: EvidenceSummary[];
	citations: EvidenceCitation[];
}

export interface EvidenceSummary {
	content: string;
	citationIndices: number[];
}

export interface EvidenceCitation {
	title: string;
	uri: string;
}

export interface EvidenceRetrievalError {
	error: string;
}
