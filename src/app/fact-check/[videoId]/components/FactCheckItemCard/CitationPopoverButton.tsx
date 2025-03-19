import { EvidenceCitation } from "@/models/evidence-retrieval";
import Link from "next/link";
import { useState } from "react";

interface Props {
	citations: EvidenceCitation[];
}

export default function CitationPopoverButton({ citations }: Props) {
	const [isShown, setIsShown] = useState(false);

	const toggle = () => {
		setIsShown((prev) => !prev);
	};

	return (
		<span>
			<button onClick={toggle}>인용</button>
			{isShown && (
				<ol className="flex flex-col gap-y-2">
					{citations.map(({ title, uri }) => {
						return (
							<li key={title}>
								<Link href={uri} target="_blank">
									{title}
								</Link>
							</li>
						);
					})}
				</ol>
			)}
		</span>
	);
}
