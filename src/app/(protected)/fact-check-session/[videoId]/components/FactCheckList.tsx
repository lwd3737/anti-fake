'use client';
import { useClaim } from '../providers/ClaimProvider';
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
  const claim = useClaim();
  const verification = useClaimVerification();

  const removeItem = (index: number) => {
    claim.remove(index);
    verification.remove(index);
  };

  return (
    <ol className={`flex flex-col gap-y-10 ${className}`}>
      {claim.items.map((claim) => {
        const verificationItem = verification.items.find(
          (item) => item.claimId === claim.id,
        );
        const isSelected = verification.claimIdsToVerify.includes(claim.id);
        const status = verificationItem
          ? VerificationStatus.VERIFIED
          : isSelected && verification.isLoading
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
                !verification.isLoading &&
                verification.addClaimToVerify(claim.id)
              }
              onUnselect={() =>
                !verification.isLoading &&
                verification.removeClaimToVerify(claim.id)
              }
              onRemove={() => removeItem(claim.index)}
            />
          </li>
        );
      })}
    </ol>
  );
}
