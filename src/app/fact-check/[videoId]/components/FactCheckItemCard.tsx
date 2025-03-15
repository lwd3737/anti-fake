import {
	ClaimDetectionPayload,
	ClaimVerificationPayload,
} from "@/dto/fact-check";
import Link from "next/link";

interface Props {
	detectionResult: ClaimDetectionPayload;
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

			<div className="h-[200px] overflow-y-auto">
				{status === VerificationStatus.VERIFIED && (
					<div className="flex flex-col gap-y-3">
						<p>{verificationResult!.verdict}</p>
						<p>판결 이유: {verificationResult!.reason}</p>

						<div>
							<p>증거</p>
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
						</div>

						<div>
							<p>출처</p>
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
						</div>
					</div>
				)}
			</div>
		</article>
	);
}
