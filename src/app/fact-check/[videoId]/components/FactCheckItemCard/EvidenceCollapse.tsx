import { Evidence } from "@/models/evidence-retrieval";
import Link from "next/link";
import { useState } from "react";

interface Props {
	evidence: Evidence;
}

export default function EvidenceCollapse({ evidence }: Props) {
	const [isShown, setIsShown] = useState(false);

	const toggle = () => {
		setIsShown((prev) => !prev);
	};

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
							<li key={index}>
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
