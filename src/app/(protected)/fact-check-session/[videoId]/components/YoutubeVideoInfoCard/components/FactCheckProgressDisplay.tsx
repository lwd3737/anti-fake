'use client';
import { useMemo } from 'react';
import { useClaim } from '../../../providers/ClaimProvider';
import { useClaimVerification } from '../../../providers/ClaimVerificationProvider';

export default function FactCheckProgressDisplay() {
  const { items: detectionResults } = useClaim();
  const { data: verificationResults } = useClaimVerification();

  const progressPercent = useMemo(() => {
    const percent = Math.round(
      (verificationResults.length / detectionResults.length) * 100,
    );
    return isNaN(percent) ? 0 : percent;
  }, [detectionResults.length, verificationResults.length]);

  return (
    <div className="flex flex-col gap-y-2 bg-surface-subtle p-4 rounded-lg">
      <div className="flex justify-between font-medium text-[0.875rem]">
        <span>팩트체크 진행률</span>
        <span className="text-brand">{progressPercent}%</span>
      </div>
      <progress
        className="w-full"
        max={detectionResults.length}
        value={verificationResults.length}
      />
    </div>
  );
}
