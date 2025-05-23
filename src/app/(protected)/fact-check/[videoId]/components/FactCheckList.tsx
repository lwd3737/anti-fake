'use client';
import { useClaim } from '../providers/ClaimProvider';
import { useClaimVerificationBatch } from '../providers/ClaimVerificationBatchProvider';
import FactCheckItemCard, {
  VerificationStatus,
} from './FactCheckItemCard/FactCheckItemCard';
import { useClaimVerification } from '../providers/ClaimVerificationProvider';
import { FactCheckSession } from '@/models/fact-check-session';

interface Props {
  factCheckSession: FactCheckSession;
  className?: string;
}

export default function FactCheckList({ factCheckSession, className }: Props) {
  const { claims, remove: removeClaim } = useClaim();
  const { data: verificationResults, remove: removeVerficationResult } =
    useClaimVerification();
  const {
    isLoading: isBatchLoading,
    claimIndexesToVerify,
    addClaimToVerify,
    removeClaimToVerify,
  } = useClaimVerificationBatch();

  const removeItem = (index: number) => {
    removeClaim(index);
    removeVerficationResult(index);
  };

  return (
    <ol className={`flex flex-col gap-y-10 ${className}`}>
      {claims.map((detectionResult) => {
        const verificationResult = verificationResults.find(
          (verified) => verified.claimIndex === detectionResult.index,
        );
        const isSelected = claimIndexesToVerify.includes(detectionResult.index);
        const status = verificationResult
          ? VerificationStatus.VERIFIED
          : isSelected && isBatchLoading
            ? VerificationStatus.LOADING
            : VerificationStatus.NOT_VERIFIED;

        // TODO: theme 적용
        return (
          <li className="flex flex-col gap-y-6" key={detectionResult.index}>
            <FactCheckItemCard
              key={detectionResult.index}
              claim={detectionResult}
              verificationResult={verificationResult}
              status={status}
              isSelected={isSelected}
              onSelect={() =>
                !isBatchLoading && addClaimToVerify(detectionResult.index)
              }
              onUnselect={() =>
                !isBatchLoading && removeClaimToVerify(detectionResult.index)
              }
              onRemove={() => removeItem(detectionResult.index)}
            />
          </li>
        );
      })}
    </ol>
  );
}
