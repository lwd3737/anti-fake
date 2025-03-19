import { ClaimVerificationResultWithDetails } from "@/models/claim-verification";
import Link from "next/link";
import { useState } from "react";
import EvidenceCollapse from "./EvidenceCollapse";
import CitationPopoverButton from "./CitationPopOverButton";

interface Props extends ClaimVerificationResultWithDetails {}

export default function VerficicationResultCardBody({
	verdict,
	reason,
	evidence,
}: Props) {
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

			<EvidenceCollapse evidence={evidence} />
			<CitationPopoverButton citations={evidence.citations} />
		</div>
	);
}
