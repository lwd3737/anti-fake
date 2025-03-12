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
						<p>판결 근거: {verificationResult!.reason}</p>

						<div>
							<p>증거</p>
							<ol className="flex flex-col gap-y-2">
								{verificationResult!.evidence.contents.map((content, index) => (
									<li key={index}>{content}</li>
								))}
							</ol>
						</div>

						<div>
							<p>출처</p>
							<ol className="flex flex-col gap-y-2">
								{verificationResult!.evidence.sources.map(
									({ title, uri }, index) => (
										<Link key={index} href={uri!}>
											{title}
										</Link>
									),
								)}
							</ol>
						</div>
					</div>
				)}
			</div>
		</article>
	);
}
