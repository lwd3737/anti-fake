export enum FactCheckEventType {
	EVIDENCE_CITATION = "MOVE_EVIDENCE_CITATION",
}

export const createEvidenceCitationEvent = (
	summaryIndex: number,
): CustomEvent =>
	new CustomEvent(FactCheckEventType.EVIDENCE_CITATION, {
		detail: { index: summaryIndex },
	});
