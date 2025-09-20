import { VerificationEvidence } from '@/models/claim-verification';
import { MutableRefObject } from 'react';
import Image from 'next/image';

interface Props {
  itemsRef: MutableRefObject<HTMLElement[]>;
  evidences: VerificationEvidence[];
  highlightedItemIndex: number | null;
  isShown: boolean;
  onToggle: () => void;
}

export default function EvidenceCollapse({
  itemsRef,
  evidences,
  highlightedItemIndex,
  isShown,
  onToggle,
}: Props) {
  // TODO: theme 적용
  return (
    <section className="flex flex-col gap-y-2">
      <button className="flex gap-x-2 cursor-pointer" onClick={onToggle}>
        <span className="inline-block w-[0.675rem]">
          {isShown ? (
            <Image
              src="/icons/collapse-opened.svg"
              alt="collapse opened"
              width={10}
              height={10}
            />
          ) : (
            <Image
              src="/icons/collapse-closed.svg"
              alt="collapse closed"
              width={8}
              height={8}
            />
          )}
        </span>
        <span className="font-semibold text-[0.875rem]">증거</span>
      </button>

      <ol
        className={`flex flex-col gap-y-4 pl-4 max-h-[30vh] overflow-y-auto ${
          isShown ? '' : 'hidden'
        }`}
      >
        {evidences.map(({ summary, citations }, evidenceIndex) => {
          return (
            <li
              className={`flex flex-col gap-y-1
								`}
              ref={(el) => {
                if (el) itemsRef.current[evidenceIndex] = el;
              }}
              key={evidenceIndex}
            >
              <div
                className={`flex gap-x-2 w-fit text-[0.875rem] ${
                  highlightedItemIndex === evidenceIndex
                    ? 'bg-[#FFF59D] text-[#2C3E50]'
                    : ''
                }`}
              >
                <span className="text-black">{evidenceIndex + 1}.</span>
                <p className="inline-block w-fit text-text-subtle">{summary}</p>
              </div>

              <div className="flex flex-wrap gap-x-2 pl-4">
                {citations.map((citation, citationIndex) => {
                  if (!citation) {
                    console.log('evidence', evidenceIndex, summary);
                    console.log('citation', citationIndex, citation);
                  }
                  const { url, siteName } = citation;
                  return (
                    <a
                      className="inline-block bg-surface-subtle-hover px-3 py-1 rounded-full text-[0.5rem] text-text-subtle"
                      key={citationIndex}
                      href={url}
                      target="_blank"
                    >
                      <span>{siteName}</span>
                    </a>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
