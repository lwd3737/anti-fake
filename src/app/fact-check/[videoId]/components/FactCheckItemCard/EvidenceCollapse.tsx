import { Evidence } from "@/models/evidence-retrieval";
import Link from "next/link";
import { RefObject, useEffect, useState } from "react";

interface Props {
	containerElRef: RefObject<HTMLElement>;
	evidence: Evidence;
	highlightedSummaryIndex: number | null;
}

export default function EvidenceCollapse({
	containerElRef,
	evidence,
	highlightedSummaryIndex,
}: Props) {
	const [isShown, setIsShown] = useState(false);

	const toggle = () => {
		setIsShown((prev) => !prev);
	};

	useEffect(
		function () {
			const containerEl = containerElRef.current;
			if (containerEl === null) return;

			const handleMoveToEvidence = (event: Event) => {
				const { index } = (event as CustomEvent).detail;
				if (highlightedSummaryIndex !== index) return;

				setIsShown(true);
				requestAnimationFrame(() => {
					const summaryEl = document.querySelector(
						`[data-summary-index="${index}"]`,
					);

					if (summaryEl === null) return;

					summaryEl.scrollIntoView({ behavior: "smooth", block: "start" });
				});
			};

			containerEl.addEventListener(
				"MOVE_EVIDENCE_CITATION",
				handleMoveToEvidence,
			);

			return () => {
				containerEl.removeEventListener(
					"MOVE_EVIDENCE_CITATION",
					handleMoveToEvidence,
				);
			};
		},
		[containerElRef, highlightedSummaryIndex],
	);

	return (
		<span className="">
			<button className="cursor-pointer" onClick={toggle}>
				증거
			</button>

			{isShown && (
				<ol className="flex flex-col gap-y-2">
					{evidence.summaries.map((summary, index) => {
						const { content, citationIndices } = summary;
						const { citations } = evidence;
						const filteredCitations = citationIndices.map(
							(index) => citations[index],
						);

						return (
							<li
								className={`${
									highlightedSummaryIndex === index ? "bg-gray-300" : ""
								}`}
								key={index}
								data-summary-index={index}
							>
								<p>{content}</p>
								<span>
									{filteredCitations.map(({ title, uri }) => {
										return (
											<Link key={uri} href={uri} target="_blank">
												{title}
											</Link>
										);
									})}
								</span>
							</li>
						);
					})}
				</ol>
			)}
		</span>
	);
}
