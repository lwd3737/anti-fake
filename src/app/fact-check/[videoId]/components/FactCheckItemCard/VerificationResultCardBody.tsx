import { ClaimVerificationResultWithDetails } from "@/models/claim-verification";
import EvidenceCollapse from "./EvidenceCollapse";
import CitationPopoverButton from "./CitationPopoverButton";
import { useRef, useState } from "react";
import VerdictReasonText from "./VerdictReasonText";

interface Props extends ClaimVerificationResultWithDetails {}

export default function VerficicationResultCardBody({
	verdict,
	reason,
	evidence,
}: Props) {
	const containerElRef = useRef<HTMLDivElement>(null);

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
		<div className="flex flex-col gap-y-3" ref={containerElRef}>
			<div>
				<p>{verdict}</p>
				<p className="h-max-[100px] overflow-y-clip">
					<VerdictReasonText
						containerElRef={containerElRef}
						reason={reason}
						hoveredCitationIndex={hoveredCitationIndex}
						onCitationHover={handleCitationHover}
						onCitationLeave={handleCitationLeave}
					/>
				</p>
			</div>

			<EvidenceCollapse
				containerElRef={containerElRef}
				evidence={evidence}
				highlightedSummaryIndex={hoveredCitationIndex}
			/>
			<CitationPopoverButton citations={evidence.citations} />
		</div>
	);
}
