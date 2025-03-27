import { ReactNode } from "react";
import ClaimDetectionProvider from "./providers/ClaimDetectionProvider";
import ClaimVerificationProvider from "./providers/ClaimVerificationProvider";
import ClaimVerificationBatchProvider from "./providers/ClaimVerificationBatchProvider";

export default function FactCheckLayout({
	params: { videoId },
	children,
}: {
	params: { videoId: string };
	children: ReactNode;
}) {
	return (
		<div className="h-full">
			<ClaimDetectionProvider videoId={videoId}>
				<ClaimVerificationProvider>
					<ClaimVerificationBatchProvider>
						{children}
					</ClaimVerificationBatchProvider>
				</ClaimVerificationProvider>
			</ClaimDetectionProvider>
		</div>
	);
}
