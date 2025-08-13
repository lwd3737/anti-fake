'use client';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useClaimVerification } from '../providers/ClaimVerificationProvider';
import Button from '@/components/Button';
import { ClaimVerification } from '@/models/claim-verification';
import { useClaim } from '../providers/ClaimProvider';

interface Props {
  className?: string;
}

export default function ControlHorizontalBar({ className }: Props) {
  const { items: claims, retry: retryClaims } = useClaim();
  const {
    items: verifications,
    claimIdsToVerify,
    isLoading: isVerficationLoading,
    start: startVerification,
    clear: clearVerification,
    addClaimsToVerifyBulk,
    resetClaimsToVerify,
    stop: stopVerification,
  } = useClaimVerification();

  const verificationsByClaimId = useMemo(
    () =>
      verifications.reduce(
        (result, verification) => {
          result[verification.claimId] = verification;
          return result;
        },
        {} as Record<string, ClaimVerification>,
      ),
    [verifications],
  );
  const [isAllItemsSelected, setIsAllItemsSelected] = useState(true);

  // const selectAllClaims = useCallback(() => {
  //   const claimIds = claims
  //     .filter((claim) => !verificationsByClaimId[claim.id])
  //     .map((claim) => claim.id);
  //   console.log('claimIds', claimIds);
  //   addClaimsToVerifyBulk(claimIds);
  // }, [claims, verificationsByClaimId, addClaimsToVerifyBulk]);

  useEffect(
    function toggleAllSelectionOnCheckboxUpdate() {
      if (isAllItemsSelected) {
        const claimIds = claims
          .filter((claim) => !verificationsByClaimId[claim.id])
          .map((claim) => claim.id);
        addClaimsToVerifyBulk(claimIds);
      } else {
        resetClaimsToVerify();
      }
    },
    [
      isAllItemsSelected,
      addClaimsToVerifyBulk,
      resetClaimsToVerify,
      claims,
      verificationsByClaimId,
    ],
  );

  const handleAllSelectionChange = (ev: ChangeEvent) => {
    const isChecked = (ev.target as HTMLInputElement).checked;
    setIsAllItemsSelected(isChecked);
  };

  const handleStartVerification = () => {
    startVerification();
    addClaimsToVerifyBulk(claimIdsToVerify);
  };

  const handleRetry = async () => {
    const ok = confirm(
      '주장 탐지 재시도는 모든 항목들을 초기화합니다. 계속하시겠습니까?',
    );
    if (!ok) return;

    resetClaimsToVerify();
    await clearVerification();
    await retryClaims();
  };

  const isAllVerified = verifications.length === claims.length;

  const allSelectionButtonStyle = useMemo(() => {
    const isDisabled = isAllVerified;
    return isDisabled
      ? 'bg-[#02020213] text-gray-400 cursor-not-allowed'
      : 'text-brand bg-[#1F3A9320] hover:bg-brand-hover';
  }, [isAllVerified]);

  const startBatchButtonStyle = useMemo(() => {
    const isDisabled = isVerficationLoading || isAllVerified;
    return isDisabled
      ? 'bg-[#AEB9D1] text-gray-300 cursor-not-allowed'
      : 'bg-brand text-white hover:bg-brand-hover';
  }, [isAllVerified, isVerficationLoading]);

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
          disabled={isVerficationLoading || isAllVerified}
        >
          <input
            id="all-selector"
            type="checkbox"
            disabled={isVerficationLoading || isAllVerified}
            checked={isAllItemsSelected}
            onChange={handleAllSelectionChange}
          />
          <label htmlFor="all-selector">전체 선택</label>
        </Button>

        {isVerficationLoading ? (
          <Button className="bg-danger text-white" onClick={stopVerification}>
            중단
          </Button>
        ) : (
          <Button
            className={startBatchButtonStyle}
            disabled={isAllVerified}
            onClick={handleStartVerification}
          >
            <strong className="inline-block w-3 text-[#FFEB3B]">
              {claimIdsToVerify.length}
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
