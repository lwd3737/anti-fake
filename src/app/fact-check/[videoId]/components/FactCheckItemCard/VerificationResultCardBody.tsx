import {
	ClaimVerificationResultWithDetails,
	VerificationVerdict,
} from "@/models/claim-verification";
import EvidenceCollapse from "./EvidenceCollapse";
import CitationPopover from "./CitationPopover";
import { useMemo, useRef, useState } from "react";
import VerdictReasonText from "./VerdictReasonText";
import assert from "assert";

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

	const verdictColorStyles = useMemo(() => {
		switch (verdict) {
			case VerificationVerdict.TRUE:
				return `bg-[#D5F5E3] text-[#1E8449]`;
			case VerificationVerdict.MOSTLY_TRUE:
				return `bg-[#E8F8F5] text-[#148F77]`;
			case VerificationVerdict.MIXED:
				return `bg-[#FCF3CF] text-[#B7950B]`;
			case VerificationVerdict.MOSTLY_FALSE:
				return `bg-[#FADBD8] text-[#922B21]`;
			case VerificationVerdict.FALSE:
				return `bg-[#ECF0F1] text-[#566573]`;
			default:
				assert(false, `Unknown verdict: ${verdict}`);
		}
	}, [verdict]);

	// TODO: theme 적용
	return (
		<div
			className="flex flex-col gap-y-3 bg-[#F9FAFB] p-4"
			ref={containerElRef}
		>
			<section className="flex flex-col gap-y-3">
				<div>
					<span
						className={`py-1 px-3 text-[0.875rem] font-medium rounded-full ${verdictColorStyles} `}
					>
						{verdict}
					</span>
				</div>
				<p className="h-max-[100px] overflow-y-clip text-[#374151] text-base">
					<VerdictReasonText
						containerElRef={containerElRef}
						reason={reason}
						hoveredCitationIndex={hoveredCitationIndex}
						onCitationHover={handleCitationHover}
						onCitationLeave={handleCitationLeave}
					/>
				</p>
			</section>

			<EvidenceCollapse
				containerElRef={containerElRef}
				evidence={evidence}
				highlightedSummaryIndex={hoveredCitationIndex}
			/>

			<div>
				<CitationPopover citations={evidence.citations} />
			</div>
		</div>
	);
}
