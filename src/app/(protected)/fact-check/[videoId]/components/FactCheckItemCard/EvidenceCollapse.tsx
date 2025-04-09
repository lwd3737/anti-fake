import { Evidence } from "@/models/evidence-retrieval";
import Link from "next/link";
import { MutableRefObject, RefObject, useEffect, useState } from "react";
import { FactCheckEventType } from "../../events";
import Image from "next/image";

interface Props {
	itemsRef: MutableRefObject<HTMLElement[]>;
	evidence: Evidence;
	highlightedItemIndex: number | null;
	isShown: boolean;
	onToggle: () => void;
}

export default function EvidenceCollapse({
	itemsRef,
	evidence,
	highlightedItemIndex,
	isShown,
	onToggle,
}: Props) {
	// TODO: theme 적용
	return (
		<section className="flex flex-col gap-y-2">
			<button className="flex gap-x-2 cursor-pointer" onClick={onToggle}>
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

			<ol
				className={`flex flex-col gap-y-4 pl-4 max-h-[30vh] overflow-y-auto ${
					isShown ? "" : "hidden"
				}`}
			>
				{evidence.summaries.map((summary, index) => {
					const { content, citationIndices } = summary;
					const { citations } = evidence;
					const filteredCitations = citationIndices
						.map((index) => citations[index])
						.filter(Boolean);

					return (
						<li
							className={`flex flex-col gap-y-1
								`}
							ref={(el) => {
								if (el) itemsRef.current[index] = el;
							}}
							key={index}
						>
							<div
								className={`flex gap-x-2 w-fit text-[0.875rem] ${
									highlightedItemIndex === index
										? "bg-[#FFF59D] text-[#2C3E50]"
										: ""
								}`}
							>
								<span className="text-black">{index + 1}.</span>
								<p className="inline-block w-fit text-text-subtle">{content}</p>
							</div>

							<div className="flex flex-wrap gap-x-2 pl-4">
								{filteredCitations.map(({ title, uri }) => {
									return (
										<Link
											className="inline-block bg-surface-subtle-hover px-3 py-1 rounded-full text-[0.5rem] text-text-subtle"
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
		</section>
	);
}
