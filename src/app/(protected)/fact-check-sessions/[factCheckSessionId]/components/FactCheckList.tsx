'use client';
import { useClaim } from '../providers/ClaimProvider';
import FactCheckItemCard, {
  VerificationStatus,
} from './FactCheckItemCard/FactCheckItemCard';
import { useClaimVerification } from '../providers/ClaimVerificationProvider';
import { FactCheckSession } from '@/models/fact-check-session';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useMemo } from 'react';
import { ErrorCode } from '@/gateway/error/error-code';

interface Props {
  factCheckSession: FactCheckSession;
  className?: string;
}

export default function FactCheckList({ factCheckSession, className }: Props) {
  const {
    items: claims,
    error: claimsError,
    isLoading: isClaimsLoading,
    remove: removeClaim,
  } = useClaim();
  const {
    items: verifications,
    isLoading: isVerificationsLoading,
    remove: removeVerification,
    claimIdsToVerify,
    addClaimToVerify,
    removeClaimToVerify,
  } = useClaimVerification();

  const removeItem = (index: number) => {
    removeClaim(index);
    removeVerification(index);
  };

  const errorMessage = useMemo(() => {
    if (!claimsError) return null;
    switch (claimsError.code) {
      case ErrorCode.CLAIMS_CREATE_FAILED:
        return '주장 생성에 실패했습니다. 다시 시도해주세요.';
      default:
        console.debug(claimsError);
        return null;
    }
  }, [claimsError]);

  return (
    <ol className={`flex flex-col gap-y-10 ${className}`}>
      {errorMessage && (
        <div className="text-red-500 text-center">{errorMessage}</div>
      )}
      {claims.map((claim) => {
        const verificationItem = verifications.find(
          (item) => item.claimId === claim.id,
        );
        const isSelected = claimIdsToVerify.includes(claim.id);
        const status = verificationItem
          ? VerificationStatus.VERIFIED
          : isSelected && isVerificationsLoading
            ? VerificationStatus.LOADING
            : VerificationStatus.NOT_VERIFIED;

        // TODO: theme 적용
        return (
          <li className="flex flex-col gap-y-6" key={claim.index}>
            <FactCheckItemCard
              key={claim.index}
              claim={claim}
              verification={verificationItem}
              status={status}
              isSelected={isSelected}
              onSelect={() =>
                !isVerificationsLoading && addClaimToVerify(claim.id)
              }
              onUnselect={() =>
                !isVerificationsLoading && removeClaimToVerify(claim.id)
              }
              onRemove={() => removeItem(claim.index)}
            />
          </li>
        );
      })}
      {isClaimsLoading && (
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner width={30} height={30} />
        </div>
      )}
    </ol>
  );
}
