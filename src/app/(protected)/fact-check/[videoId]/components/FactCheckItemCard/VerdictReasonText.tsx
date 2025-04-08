import assert from "assert";
import { ReactNode, RefObject } from "react";
import { createEvidenceCitationEvent } from "../../events";

interface Props {
	reason: string;
	onCitationHover: (index: number) => void;
	onCitationLeave: () => void;
	onCitationClick: (index: number) => void;
}

const CITATION_PATTERN = /\{\{\d+\}\}/g;
const CITATION_NUMBER_PATTERN = /\d+/;

export default function VerdictReasonText({
	reason,
	onCitationHover,
	onCitationLeave,
	onCitationClick,
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

				const citationIndex = citationIndices[index];

				return [
					...result,
					text,
					<span
						className="inline-block top-[-5px] relative bg-[#1F3A93] hover:bg-[#3A539B] mt-[-4px] mr-1 rounded-full w-5 font-normal text-white text-xs text-center cursor-pointer"
						key={index}
						onMouseEnter={() => onCitationHover(citationIndex)}
						onMouseLeave={onCitationLeave}
						onClick={() => onCitationClick(citationIndex)}
					>
						{`[${citationIndex + 1}]`}
					</span>,
				];
			}, [] as (string | ReactNode)[])}
		</div>
	);
}
