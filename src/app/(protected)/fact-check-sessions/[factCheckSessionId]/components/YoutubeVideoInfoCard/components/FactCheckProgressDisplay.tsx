'use client';
import { useMemo } from 'react';
import { useClaimVerification } from '../../../providers/ClaimVerificationProvider';
import { useClaim } from '../../../providers/ClaimProvider';

export default function FactCheckProgressDisplay() {
  const claim = useClaim();
  const { items: verifications } = useClaimVerification();

  const progressPercent = useMemo(() => {
    const percent = Math.round(
      (verifications.length / claim.items.length) * 100,
    );
    return isNaN(percent) ? 0 : percent;
  }, [claim.items.length, verifications.length]);

  return (
    <div className="flex flex-col gap-y-2 bg-surface-subtle p-4 rounded-lg">
      <div className="flex justify-between font-medium text-[0.875rem]">
        <span>팩트체크 진행률</span>
        <span className="text-brand">{progressPercent}%</span>
      </div>
      <progress
        className="w-full"
        max={claim.items.length}
        value={verifications.length}
      />
    </div>
  );
}
