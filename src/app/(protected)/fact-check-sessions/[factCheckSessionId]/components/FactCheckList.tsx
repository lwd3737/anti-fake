'use client';
import FactCheckItemCard, {
  VerificationStatus,
} from './FactCheckItemCard/FactCheckItemCard';
import { useClaimVerification } from '../providers/ClaimVerificationProvider';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useMemo } from 'react';
import { useClaim } from '../providers/ClaimProvider';

interface Props {
  className?: string;
}

export default function FactCheckList({ className }: Props) {
  const claim = useClaim();
  const verification = useClaimVerification();

  const remove = (claimId: string) => {
    claim.remove(claimId);
    verification.remove(claimId);
  };

  const errorMessage = useMemo(() => {
    if (!claim.errors.CLAIM_CREATE_FAILED) return null;

    return `(${claim.errors.CLAIM_CREATE_FAILED.count}) ${claim.errors.CLAIM_CREATE_FAILED.message}`;
  }, [claim.errors]);

  return (
    <ol className={`flex flex-col gap-y-10 ${className}`}>
      {errorMessage && (
        <div className="text-red-500 text-center">{errorMessage}</div>
      )}
      {claim.items.map((claim) => {
        const verificationItem = verification.items.find(
          (item) => item.claimId === claim.id,
        );
        const verificationError = verification.errors.find(
          (item) => item.claimId === claim.id,
        );
        const isSelected = verification.claimIdsToVerify.includes(claim.id);
        let status: VerificationStatus;
        if (verificationItem) {
          status = VerificationStatus.VERIFIED;
        } else if (isSelected && verification.isLoading) {
          status = VerificationStatus.LOADING;
        } else if (verificationError) {
          status = VerificationStatus.ERROR;
        } else {
          status = VerificationStatus.NOT_VERIFIED;
        }

        // TODO: theme 적용
        return (
          <li className="flex flex-col gap-y-6" key={claim.id}>
            <FactCheckItemCard
              claim={claim}
              verification={verificationItem}
              verificationError={verificationError?.message}
              status={status}
              isSelected={isSelected}
              onSelect={() =>
                !verification.isLoading &&
                verification.addClaimToVerify(claim.id)
              }
              onUnselect={() =>
                !verification.isLoading &&
                verification.removeClaimToVerify(claim.id)
              }
              onRemove={() => remove(claim.id)}
            />
          </li>
        );
      })}
      {claim.status === 'claimsStreaming' && (
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner width={30} height={30} />
        </div>
      )}
    </ol>
  );
}
