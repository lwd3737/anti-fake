import { ClaimVerificationResultWithDetails } from "@/models/claim-verification";
import EvidenceCollapse from "./EvidenceCollapse";
import CitationPopoverButton from "./CitationPopOverButton";

interface Props extends ClaimVerificationResultWithDetails {}

export default function VerficicationResultCardBody({
	verdict,
	reason,
	evidence,
}: Props) {
	return (
		<div className="flex flex-col gap-y-3">
			<div>
				<p>{verdict}</p>
				<p className="h-max-[100px] overflow-y-clip">{reason}</p>
			</div>

			<EvidenceCollapse evidence={evidence} />
			<CitationPopoverButton citations={evidence.citations} />
		</div>
	);
}
