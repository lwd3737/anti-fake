import { Claim } from '@/models/claim';
import ClaimVerificationCardBody from './ClaimVerificationCardBody';
import { ClaimVerification } from '@/models/claim-verification';
import Image from 'next/image';
import { useMemo } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import CloseButton from '@/components/CloseButton';

interface Props {
  claim: Claim;
  verification?: ClaimVerification;
  status: VerificationStatus;
  isSelected: boolean;
  onSelect: () => void;
  onUnselect: () => void;
  onRemove: () => void;
}

export enum VerificationStatus {
  VERIFIED = 'VERIFIED',
  LOADING = 'LOADING',
  NOT_VERIFIED = 'NOT_VERIFIED',
}

export default function FactCheckItemCard({
  claim,
  verification,
  status,
  isSelected,
  onSelect,
  onUnselect,
  onRemove,
}: Props) {
  const statusFileName = useMemo(() => {
    switch (status) {
      case VerificationStatus.VERIFIED:
        return 'checked.svg';
      case VerificationStatus.NOT_VERIFIED:
        return 'question-mark.svg';
    }
  }, [status]);

  const stateStyle = useMemo(() => {
    if (isSelected)
      return 'outline outline-2 outline-brand bg-surface-card-hover cursor-pointer';
    else if (status === VerificationStatus.NOT_VERIFIED)
      return 'hover:outline hover:outline-2 hover:bg-[#1F3A931A] hover:outline-brand cursor-pointer';
    else return '';
  }, [isSelected, status]);

  const handleClick = () => {
    if (status !== VerificationStatus.NOT_VERIFIED) return;

    if (isSelected) onUnselect();
    else onSelect();
  };

  return (
    <article
      className={`flex flex-col flex-1 gap-y-4 bg-white shadow-sm p-6 rounded-sm ${stateStyle}`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start gap-x-10">
        <div className="flex flex-1 items-start gap-x-2">
          {status === VerificationStatus.LOADING ? (
            <LoadingSpinner className="mt-1" width={18} height={18} />
          ) : (
            <Image
              className={`mt-1`}
              src={`/icons/${statusFileName}`}
              alt={'status icon'}
              width={18}
              height={18}
            />
          )}
          <p className="px-3 font-medium text-lg">
            {claim.index + 1}. {'"'}
            {claim.content}
            {'"'}
          </p>
        </div>
        <CloseButton onClick={onRemove} />
      </div>

      {status === VerificationStatus.VERIFIED && (
        <ClaimVerificationCardBody {...verification!} />
      )}
    </article>
  );
}
