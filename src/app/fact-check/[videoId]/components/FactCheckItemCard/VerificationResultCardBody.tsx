import {
	ClaimVerificationResultWithDetails,
	displayVerdict,
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

	const [
		highlightedEvidenceCitationIndex,
		setHighlightedEvidenceCitationIndex,
	] = useState<number | null>(null);

	const handleEvidenceCitationHover = (index: number): void => {
		setHighlightedEvidenceCitationIndex(index);
	};

	const handleEvidenceCitationLeave = (): void => {
		setHighlightedEvidenceCitationIndex(null);
	};

	const [isEvidenceShown, setIsEvidenceShown] = useState(false);

	const handleToggleEvidence = () => {
		setIsEvidenceShown((prev) => !prev);
	};

	const evidenceItemsRef = useRef<HTMLElement[]>([]);

	const handleGoToEvidenceCitation = (index: number) => {
		const evidenceItemEl = evidenceItemsRef.current[index];
		assert(evidenceItemEl !== undefined, "evidence item is undefined");

		setIsEvidenceShown(true);
		requestAnimationFrame(() => {
			evidenceItemEl.scrollIntoView({ behavior: "smooth", block: "center" });
		});
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
			className="flex flex-col gap-y-3 bg-[#F9FAFB] p-4 rounded-lg"
			ref={containerElRef}
		>
			<section className="flex flex-col gap-y-3">
				<div>
					<span
						className={`py-1 px-3 text-[0.875rem] font-medium rounded-full ${verdictColorStyles} `}
					>
						{displayVerdict(verdict)}
					</span>
				</div>
				<p className="h-max-[100px] overflow-y-clip text-[#374151] text-base">
					<VerdictReasonText
						reason={reason}
						onCitationHover={handleEvidenceCitationHover}
						onCitationLeave={handleEvidenceCitationLeave}
						onCitationClick={handleGoToEvidenceCitation}
					/>
				</p>
			</section>

			<EvidenceCollapse
				itemsRef={evidenceItemsRef}
				evidence={evidence}
				highlightedItemIndex={highlightedEvidenceCitationIndex}
				isShown={isEvidenceShown}
				onToggle={handleToggleEvidence}
			/>

			<div>
				<CitationPopover citations={evidence.citations} />
			</div>
		</div>
	);
}
