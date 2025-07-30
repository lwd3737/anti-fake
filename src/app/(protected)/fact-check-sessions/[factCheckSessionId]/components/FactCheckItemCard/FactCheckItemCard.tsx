import { Claim } from '@/models/claim';
import ClaimVerificationCardBody from './ClaimVerificationCardBody';
import { ClaimVerification } from '@/models/claim-verification';
import Image from 'next/image';
import { useMemo } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import CloseButton from '@/components/CloseButton';
import { ClaimVerificationError } from '../../providers/ClaimVerificationProvider';

interface Props {
  claim: Claim;
  verification?: ClaimVerification;
  verificationError?: string;
  status: VerificationStatus;
  isSelected: boolean;
  onSelect: () => void;
  onUnselect: () => void;
  onRemove: () => void;
}

export enum VerificationStatus {
  LOADING = 'LOADING',
  NOT_VERIFIED = 'NOT_VERIFIED',
  VERIFIED = 'VERIFIED',
  ERROR = 'ERROR',
}

export default function FactCheckItemCard({
  claim,
  verification,
  verificationError,
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
      case VerificationStatus.ERROR:
        return 'error.svg';
    }
  }, [status]);

  const stateStyle = useMemo(() => {
    if (isSelected)
      return 'outline outline-2 outline-brand bg-surface-card-hover cursor-pointer';
    else if (status === VerificationStatus.NOT_VERIFIED)
      return 'hover:outline hover:outline-2 hover:bg-[#1F3A931A] hover:outline-brand cursor-pointer';
    else return '';
  }, [isSelected, status]);

  const renderVerificationCardBody = () => {
    switch (status) {
      case VerificationStatus.VERIFIED:
        return <ClaimVerificationCardBody {...verification!} />;
      case VerificationStatus.ERROR:
        return <div>{verificationError}</div>;
    }
  };

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
      <div className="flex justify-between items-start gap-x-2">
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
          <div className="flex flex-col gap-y-1">
            <p className="px-3 font-medium text-lg">
              {claim.index + 1}. {'"'}
              {claim.content}
              {'"'}
            </p>
            <div className="flex flex-col gap-y-1 px-3">
              <p className="font-semibold text-gray-500 text-sm">
                💬 맥락 요약
              </p>
              <p className="px-4 font-medium text-gray-500 text-sm">
                {claim.context}
              </p>
            </div>
          </div>
        </div>
        <CloseButton onClick={onRemove} />
      </div>

      {renderVerificationCardBody()}
    </article>
  );
}
