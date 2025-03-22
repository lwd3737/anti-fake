export enum FactCheckEventType {
	MOVE_TO_EVIDENCE_CITATION = "MOVE_TO_EVIDENCE_CITATION",
}

export const createEvidenceCitationEvent = (
	summaryIndex: number,
): CustomEvent =>
	new CustomEvent(FactCheckEventType.MOVE_TO_EVIDENCE_CITATION, {
		detail: { index: summaryIndex },
	});
