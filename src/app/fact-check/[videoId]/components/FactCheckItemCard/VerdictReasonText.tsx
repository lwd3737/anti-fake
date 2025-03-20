import assert from "assert";
import { ReactNode, RefObject } from "react";

interface Props {
	containerElRef: RefObject<HTMLElement>;
	reason: string;
	hoveredCitationIndex: number | null;
	onCitationHover: (index: number) => void;
	onCitationLeave: () => void;
}

const CITATION_PATTERN = /\{\{\d+\}\}/g;
const CITATION_NUMBER_PATTERN = /\d+/;

export default function VerdictReasonText({
	containerElRef,
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

	const handleCitationClick = (index: number) => {
		const containerEl = containerElRef.current;
		if (containerEl === null) return;

		containerEl.dispatchEvent(
			new CustomEvent("MOVE_EVIDENCE_CITATION", { detail: { index } }),
		);
	};

	return (
		<div>
			{reason.split(CITATION_PATTERN).reduce((result, text, index, origin) => {
				const isLast = index === origin.length - 1;
				if (isLast) {
					return [...result, text];
				}

				const citationIndex = citationIndices[index];

				return [
					...result,
					text,
					<span
						className="inline-block bg-gray-200 hover:bg-gray-300 w-5 text-gray-500 text-center cursor-pointer"
						key={index}
						onMouseEnter={() => onCitationHover(citationIndex)}
						onMouseLeave={onCitationLeave}
						onClick={() => handleCitationClick(citationIndex)}
					>
						{citationIndex + 1}
					</span>,
				];
			}, [] as (string | ReactNode)[])}
		</div>
	);
}
