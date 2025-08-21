'use client';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useClaimVerification } from '../providers/ClaimVerificationProvider';
import Button from '@/components/Button';
import { ClaimVerification } from '@/models/claim-verification';
import { useClaim } from '../providers/ClaimProvider';

interface Props {
  className?: string;
}

export default function ControlHorizontalBar({ className }: Props) {
  const claim = useClaim();
  const verification = useClaimVerification();
  const { addClaimsToVerifyBulk, resetClaimsToVerify, clear } = verification;

  const [isAllItemsSelected, setIsAllItemsSelected] = useState(true);

  useEffect(
    function toggleAllSelectionOnCheckboxUpdate() {
      if (isAllItemsSelected) {
        const verificationsByClaimId = verification.items.reduce(
          (result, verification) => {
            result[verification.claimId] = verification;
            return result;
          },
          {} as Record<string, ClaimVerification>,
        );
        const notVerifiedClaimIds = claim.items
          .filter((claim) => !verificationsByClaimId[claim.id])
          .map((claim) => claim.id);

        addClaimsToVerifyBulk(notVerifiedClaimIds);
      } else {
        resetClaimsToVerify();
      }
    },
    [
      isAllItemsSelected,
      claim.items,
      verification.items,
      addClaimsToVerifyBulk,
      resetClaimsToVerify,
    ],
  );

  const handleAllSelectionChange = (ev: ChangeEvent) => {
    const isChecked = (ev.target as HTMLInputElement).checked;
    setIsAllItemsSelected(isChecked);
  };

  const handleStartVerification = () => {
    verification.start();
  };

  const handleRetry = async () => {
    const ok = confirm(
      '주장 탐지 재시도는 모든 항목들을 초기화합니다. 계속하시겠습니까?',
    );
    if (!ok) return;

    setIsAllItemsSelected(false);
    resetClaimsToVerify();
    await clear();
    await claim.retry();
  };

  const isAllVerified = verification.items.length === claim.items.length;

  const allSelectionButtonStyle = useMemo(() => {
    const isDisabled = isAllVerified;
    return isDisabled
      ? 'bg-[#02020213] text-gray-400 cursor-not-allowed'
      : 'text-brand bg-[#1F3A9320] hover:bg-brand-hover';
  }, [isAllVerified]);

  const startBatchButtonStyle = useMemo(() => {
    const isDisabled = verification.isLoading || isAllVerified;
    return isDisabled
      ? 'bg-[#AEB9D1] text-gray-300 cursor-not-allowed'
      : 'bg-brand text-white hover:bg-brand-hover';
  }, [isAllVerified, verification.isLoading]);

  const retryButtonStyle = useMemo(
    () => `bg-surface-subtle hover:bg-surface-subtle-hover text-text-base`,
    [],
  );

  return (
    <div
      // TODO: theme 적용
      className={`h-full flex items-center justify-end gap-x-6 bg-white p-5 shadow-sm [box-shadow:0_-1px_2px_0_rgba(0,0,0,0.05)] ${className}`}
    >
      <div className="flex justify-center items-center gap-x-4 pr-6 border-gray-200 border-r border-solid">
        <Button
          className={`flex items-center gap-x-2 ${allSelectionButtonStyle}`}
          disabled={verification.isLoading || isAllVerified}
        >
          <input
            id="all-selector"
            type="checkbox"
            disabled={verification.isLoading || isAllVerified}
            checked={isAllItemsSelected}
            onChange={handleAllSelectionChange}
          />
          <label htmlFor="all-selector">전체 선택</label>
        </Button>

        {verification.isLoading ? (
          <Button className="bg-danger text-white" onClick={verification.stop}>
            중단
          </Button>
        ) : (
          <Button
            className={startBatchButtonStyle}
            disabled={isAllVerified}
            onClick={handleStartVerification}
          >
            <strong className="inline-block w-3 text-[#FFEB3B]">
              {verification.claimIdsToVerify.length}
            </strong>
            개 검증 시작
          </Button>
        )}
      </div>

      <Button className={retryButtonStyle} onClick={handleRetry}>
        주장 탐지 재시도
      </Button>
    </div>
  );
}
