import { ClaimVerification, VerdictType } from '@/models/claim-verification';
import EvidenceCollapse from './EvidenceCollapse';
import CitationPopover from './CitationPopover';
import { useMemo, useRef, useState } from 'react';
import VerdictReasonText from './VerdictReasonText';
import assert from 'assert';

interface Props extends ClaimVerification {}

export default function ClaimVerificationCardBody({
  verdict,
  verdictReason,
  evidences,
}: Props) {
  const containerElRef = useRef<HTMLDivElement>(null);

  const [
    highlightedEvidenceCitationIndex,
    setHighlightedEvidenceCitationIndex,
  ] = useState<number | null>(null);

  const handleEvidenceCitationHover = (index: number): void => {
    setHighlightedEvidenceCitationIndex(index);
  };

  const handleEvidenceCitationLeave = (): void => {
    setHighlightedEvidenceCitationIndex(null);
  };

  const [isEvidenceShown, setIsEvidenceShown] = useState(false);

  const handleToggleEvidence = () => {
    setIsEvidenceShown((prev) => !prev);
  };

  const evidenceItemsRef = useRef<HTMLElement[]>([]);

  const handleGoToEvidenceCitation = (index: number) => {
    const evidenceItemEl = evidenceItemsRef.current[index];
    assert(evidenceItemEl !== undefined, 'evidence item is undefined');

    setIsEvidenceShown(true);
    requestAnimationFrame(() => {
      evidenceItemEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  };

  const verdictColorStyles = useMemo(() => {
    switch (verdict) {
      case VerdictType.TRUE:
        return `bg-[#D5F5E3] text-[#1E8449]`;
      case VerdictType.MOSTLY_TRUE:
        return `bg-[#E8F8F5] text-[#148F77]`;
      case VerdictType.MIXED:
        return `bg-[#FCF3CF] text-[#B7950B]`;
      case VerdictType.MOSTLY_FALSE:
        return `bg-[#FADBD8] text-[#922B21]`;
      case VerdictType.FALSE:
        return `bg-[#ECF0F1] text-[#566573]`;
      case VerdictType.UNKNOWN:
        return `bg-[#F0F0F0] text-[#607D8B]`;
      default:
        assert(false, `Unknown verdict: ${verdict}`);
    }
  }, [verdict]);

  const allCitations = useMemo(() => {
    return evidences.flatMap((evidence) => evidence.citations);
  }, [evidences]);

  // TODO: theme 적용
  return (
    <div
      className="flex flex-col gap-y-3 bg-surface-card p-4 rounded-lg"
      ref={containerElRef}
    >
      <section className="flex flex-col gap-y-3">
        <div>
          <span
            className={`py-1 px-3 text-[0.875rem] font-medium rounded-full ${verdictColorStyles} `}
          >
            {displayVerdict(verdict)}
          </span>
        </div>
        <div className="h-max-[100px] overflow-y-clip">
          <VerdictReasonText
            reason={verdictReason}
            onCitationHover={handleEvidenceCitationHover}
            onCitationLeave={handleEvidenceCitationLeave}
            onCitationClick={handleGoToEvidenceCitation}
          />
        </div>
      </section>

      <EvidenceCollapse
        itemsRef={evidenceItemsRef}
        evidences={evidences}
        highlightedItemIndex={highlightedEvidenceCitationIndex}
        isShown={isEvidenceShown}
        onToggle={handleToggleEvidence}
      />

      <div>
        <CitationPopover citations={allCitations} />
      </div>
    </div>
  );
}

export const displayVerdict = (verdict: VerdictType): string => {
  switch (verdict) {
    case VerdictType.TRUE:
      return '진실';
    case VerdictType.MOSTLY_TRUE:
      return '대체로 진실';
    case VerdictType.MIXED:
      return '진실/거짓 혼합';
    case VerdictType.MOSTLY_FALSE:
      return '대체로 거짓';
    case VerdictType.FALSE:
      return '거짓';
    case VerdictType.UNKNOWN:
      return '알 수 없음';
    default:
      assert(false, `Unknown verdict: ${verdict}`);
  }
};
