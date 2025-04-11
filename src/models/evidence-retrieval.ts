export type EvidenceRetrievalResult = Evidence | EvidenceRetrievalError;

export interface RetrievalCitation {
	title?: string;
	url: string;
	description?: string;
	image?: string;
	siteName: string;
}

export interface RetrievalItem {
	summary: string;
	citationIndexes: number[];
}

export interface Evidence {
	items: EvidenceItem[];
	citations: EvidenceCitation[];
}

export interface EvidenceItem extends RetrievalItem {}

export interface EvidenceCitation extends RetrievalCitation {}

export interface EvidenceRetrievalError {
	error: string;
}
