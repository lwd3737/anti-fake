import { ClaimVerificationPayload } from "@/dto/fact-check";
import { ClaimDetectionResult } from "@/models/claim-detection";
import Link from "next/link";
import { useState } from "react";

interface Props {
	detectionResult: ClaimDetectionResult;
	verificationResult?: ClaimVerificationPayload;
	status: VerificationStatus;
	onRemove: () => void;
}

export enum VerificationStatus {
	VERIFIED = "VERIFIED",
	LOADING = "LOADING",
	NOT_VERIFIED = "NOT_VERIFIED",
}

export default function FactCheckItemCard({
	detectionResult,
	verificationResult,
	status,
	onRemove,
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
		<article className="flex flex-col flex-1 gap-y-4">
			<div className="flex justify-between items-center gap-x-10">
				<div className="flex items-center gap-x-2">
					<span>{status}</span>
					<h3>
						{detectionResult.index + 1}. {detectionResult.content}
					</h3>
				</div>
				<button onClick={onRemove}>삭제</button>
			</div>

			{status === VerificationStatus.VERIFIED && (
				<div className="flex flex-col gap-y-3">
					<div>
						<p>{verificationResult!.verdict}</p>
						<p className="h-max-[100px] overflow-y-clip">
							{verificationResult!.reason}
						</p>
					</div>

					<div className="">
						<p className="cursor-pointer" onClick={toggleEvidence}>
							증거
						</p>
						{isEvidenceShown && (
							<ol className="flex flex-col gap-y-2">
								{verificationResult?.evidence.summaries.map(
									(summary, index) => {
										const { content, citationIndices } = summary;
										const { citations } = verificationResult?.evidence;
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
									},
								)}
							</ol>
						)}
					</div>

					<div>
						<button onClick={toggleCitation}>인용</button>
						{isCitiationShown && (
							<ol className="flex flex-col gap-y-2">
								{verificationResult?.evidence.citations.map(
									({ title, uri }) => {
										return (
											<li key={title}>
												<Link href={uri} target="_blank">
													{title}
												</Link>
											</li>
										);
									},
								)}
							</ol>
						)}
					</div>
				</div>
			)}
		</article>
	);
}
