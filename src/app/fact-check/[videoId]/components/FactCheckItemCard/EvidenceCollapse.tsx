import { Evidence } from "@/models/evidence-retrieval";
import Link from "next/link";
import { RefObject, useEffect, useState } from "react";
import { FactCheckEventType } from "../../events";
import Image from "next/image";

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
		function moveToEvidenceOnCitationClick() {
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
				FactCheckEventType.MOVE_TO_EVIDENCE_CITATION,
				handleMoveToEvidence,
			);

			return () => {
				containerEl.removeEventListener(
					FactCheckEventType.MOVE_TO_EVIDENCE_CITATION,
					handleMoveToEvidence,
				);
			};
		},
		[containerElRef, highlightedSummaryIndex],
	);

	// TODO: theme 적용
	return (
		<section className="flex flex-col gap-y-2">
			<button className="flex gap-x-2 cursor-pointer" onClick={toggle}>
				<span className="inline-block w-[0.675rem]">
					{isShown ? (
						<Image
							src="/icons/collapse-opened.svg"
							alt="collapse opened"
							width={10}
							height={10}
						/>
					) : (
						<Image
							src="/icons/collapse-closed.svg"
							alt="collapse closed"
							width={8}
							height={8}
						/>
					)}
				</span>
				<span className="font-semibold text-[0.875rem]">증거</span>
			</button>

			{isShown && (
				<ol className="flex flex-col gap-y-4 pl-4">
					{evidence.summaries.map((summary, index) => {
						const { content, citationIndices } = summary;
						const { citations } = evidence;
						const filteredCitations = citationIndices.map(
							(index) => citations[index],
						);

						return (
							<li
								className={`flex flex-col gap-y-1 ${
									highlightedSummaryIndex === index ? "bg-gray-300" : ""
								}`}
								key={index}
								data-summary-index={index}
							>
								<div className="flex gap-x-2 text-[0.875rem]">
									<span className="text-black">{index + 1}.</span>
									<p className="text-[#4B5563]">{content}</p>
								</div>

								<div className="flex flex-wrap gap-x-2 pl-4">
									{filteredCitations.map(({ title, uri }) => {
										return (
											<Link
												className="inline-block bg-[#E5E7EB] px-3 py-1 rounded-full text-[#4B5563] text-[0.5rem]"
												key={uri}
												href={uri}
												target="_blank"
											>
												{title}
											</Link>
										);
									})}
								</div>
							</li>
						);
					})}
				</ol>
			)}
		</section>
	);
}
