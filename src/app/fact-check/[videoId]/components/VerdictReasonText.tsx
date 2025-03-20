import assert from "assert";
import { ReactNode } from "react";

interface Props {
	reason: string;
	hoveredCitationIndex: number | null;
	onCitationHover: (index: number) => void;
	onCitationLeave: () => void;
}

const CITATION_PATTERN = /\{\{\d+\}\}/g;
const CITATION_NUMBER_PATTERN = /\d+/;

export default function VerdictReasonText({
	reason,
	onCitationHover,
	onCitationLeave,
}: Props) {
	const citationIndices = Array.from(reason.matchAll(CITATION_PATTERN)).map(
		(match) => {
			const citationPattern = match[0];

			const citationNumberMatch = citationPattern.match(
				CITATION_NUMBER_PATTERN,
			);
			assert(citationNumberMatch !== null), "evidence number is null";

			const citationNumber = parseInt(citationNumberMatch[0]);
			const citationIndex = citationNumber - 1;

			return citationIndex;
		},
	);

	return (
		<div>
			{reason.split(CITATION_PATTERN).reduce((result, text, index, origin) => {
				const isLast = index === origin.length - 1;
				if (isLast) {
					return [...result, text];
				}

				const citedSummaryIndex = citationIndices[index];

				return [
					...result,
					text,
					<span
						className="inline-block bg-gray-200 hover:bg-gray-300 w-5 text-gray-500 text-center cursor-pointer"
						key={index}
						onMouseEnter={() => onCitationHover(citedSummaryIndex)}
						onMouseLeave={() => onCitationLeave()}
					>
						{citedSummaryIndex + 1}
					</span>,
				];
			}, [] as (string | ReactNode)[])}
		</div>
	);
}
