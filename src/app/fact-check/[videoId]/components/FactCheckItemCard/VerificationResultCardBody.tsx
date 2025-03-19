import { ClaimVerificationResultWithDetails } from "@/models/claim-verification";
import Link from "next/link";
import { useState } from "react";

interface Props extends ClaimVerificationResultWithDetails {}

export default function VerficicationResultCardBody({
	verdict,
	reason,
	evidence,
}: Props) {
	const [isEvidenceShown, setIsEvidenceShown] = useState(false);

	const toggleEvidence = () => {
		setIsEvidenceShown((prev) => !prev);
	};

	const [isCitiationShown, setIsCitiationShown] = useState(false);

	const toggleCitation = () => {
		setIsCitiationShown((prev) => !prev);
	};

	return (
		<div className="flex flex-col gap-y-3">
			<div>
				<p>{verdict}</p>
				<p className="h-max-[100px] overflow-y-clip">{reason}</p>
			</div>

			<div className="">
				<p className="cursor-pointer" onClick={toggleEvidence}>
					증거
				</p>
				{isEvidenceShown && (
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
			</div>

			<div>
				<button onClick={toggleCitation}>인용</button>
				{isCitiationShown && (
					<ol className="flex flex-col gap-y-2">
						{evidence.citations.map(({ title, uri }) => {
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
			</div>
		</div>
	);
}
