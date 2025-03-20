import { ClaimVerificationResultWithDetails } from "@/models/claim-verification";
import EvidenceCollapse from "./EvidenceCollapse";
import CitationPopoverButton from "./CitationPopoverButton";
import { useState } from "react";
import VerdictReasonText from "../VerdictReasonText";

interface Props extends ClaimVerificationResultWithDetails {}

const EVIDENCE_SUMMARY_PATTERN = /\{\{\d+\}\}/g;
const EVIDENCE_SUMMARY_NUMBER_PATTERN = /\d+/;

export default function VerficicationResultCardBody({
	verdict,
	reason,
	evidence,
}: Props) {
	const [hoveredCitationIndex, setCitationIndex] = useState<number | null>(
		null,
	);

	const handleCitationHover = (index: number): void => {
		setCitationIndex(index);
	};

	const handleCitationLeave = (): void => {
		setCitationIndex(null);
	};

	return (
		<div className="flex flex-col gap-y-3">
			<div>
				<p>{verdict}</p>
				<p className="h-max-[100px] overflow-y-clip">
					<VerdictReasonText
						reason={reason}
						hoveredCitationIndex={hoveredCitationIndex}
						onCitationHover={handleCitationHover}
						onCitationLeave={handleCitationLeave}
					/>
				</p>
			</div>

			<EvidenceCollapse
				evidence={evidence}
				hoveredSummaryIndex={hoveredCitationIndex}
			/>
			<CitationPopoverButton citations={evidence.citations} />
		</div>
	);
}
