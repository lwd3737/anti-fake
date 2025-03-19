import { ClaimVerificationResultWithDetails } from "@/models/claim-verification";
import EvidenceCollapse from "./EvidenceCollapse";
import CitationPopoverButton from "./CitationPopoverButton";
import { ReactNode, useState } from "react";
import assert from "assert";

interface Props extends ClaimVerificationResultWithDetails {}

const EVIDENCE_SUMMARY_PATTERN = /\{\{\d+\}\}/g;
const EVIDENCE_SUMMARY_NUMBER_PATTERN = /\d+/;

export default function VerficicationResultCardBody({
	verdict,
	reason,
	evidence,
}: Props) {
	const [hoveredCitedSummaryIndex, setHoveredCitedSummaryIndex] = useState<
		number | null
	>(null);

	const citedSummaryIndices = Array.from(
		reason.matchAll(EVIDENCE_SUMMARY_PATTERN),
	).map((match) => {
		const template = match[0];

		const sumamryNumberMatch = template.match(EVIDENCE_SUMMARY_NUMBER_PATTERN);
		assert(sumamryNumberMatch !== null), "evidence number is null";

		const sumamryNumber = parseInt(sumamryNumberMatch[0]);
		const summaryIndex = sumamryNumber - 1;

		return summaryIndex;
	});

	const highlightableReasonParts = reason
		.split(EVIDENCE_SUMMARY_PATTERN)
		.reduce((result, text, index, origin) => {
			const isLast = index === origin.length - 1;
			if (isLast) {
				return [...result, text];
			}

			const citedSummaryIndex = citedSummaryIndices[index];

			return [
				...result,
				text,
				<span
					className="inline-block bg-gray-200 hover:bg-gray-300 w-5 text-gray-500 text-center cursor-pointer"
					key={index}
					onMouseEnter={() => setHoveredCitedSummaryIndex(citedSummaryIndex)}
					onMouseLeave={() => setHoveredCitedSummaryIndex(null)}
				>
					{citedSummaryIndex + 1}
				</span>,
			];
		}, [] as (string | ReactNode)[]);

	return (
		<div className="flex flex-col gap-y-3">
			<div>
				<p>{verdict}</p>
				<p className="h-max-[100px] overflow-y-clip">
					{highlightableReasonParts}
				</p>
			</div>

			<EvidenceCollapse
				evidence={evidence}
				hoveredSummaryIndex={hoveredCitedSummaryIndex}
			/>
			<CitationPopoverButton citations={evidence.citations} />
		</div>
	);
}
