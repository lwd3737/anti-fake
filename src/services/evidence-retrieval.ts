import RETRIEVE_EVIDENCES_PROMPT from '@/prompts/retrieve-evidences';
import GoogleSearch from '../retrievers/google-search';
import LLMHistoryLogger, { TokenUsage } from '@/logger/llm-history.logger';
import loadConfig from '@/config';
import EventEmitter from 'events';
import { VerificationEvidence } from '@/models/claim-verification';
import { isFailure, Result } from '@/result';
import { Claim } from '@/models/claim';
import { WebSearchMetadata } from '@/models/web-search';

enum EventType {
  RETRIEVED = 'RETRIEVED',
}

export default class EvidenceRetrievalService {
  private events = new EventEmitter();
  private logger = new LLMHistoryLogger('retrieve-evidence', {
    title: 'Retrieve evidence',
  });
  private webSearch;

  constructor(signal: AbortSignal) {
    this.webSearch = new GoogleSearch(signal);
  }

  public retrieveBulk(claims: Claim[]): this {
    // INFO: 현재는 rate limit 때문에 동기적으로 실행
    // TODO: rate limit을 고려하여 요청 여러개를 하나의 단위로 묶어서 비동기로 실행하도록 수정
    // 그룹으로 묶인 요청 사이에는 delay를 주어 rate limit을 준수하도록 함
    this.logger.monitor<void>(async (log, error, save) => {
      for (const claim of claims) {
        try {
          const retrievalResult = await this.retrieve(claim.content);
          if (isFailure(retrievalResult)) {
            this.events.emit(EventType.RETRIEVED, {
              ...retrievalResult,
              context: {
                claimId: claim.id,
              },
            });
            error({
              code: 'EvidenceRetrievalError',
              error: new Error(retrievalResult.message),
              context: {
                claimId: claim.id,
              },
            });
          } else {
            const { evidences, metadata } = retrievalResult;
            this.events.emit(EventType.RETRIEVED, evidences);

            if (metadata) {
              log({
                title: 'Evidence Retrieval',
                prompt: claim.content,
                output: evidences,
                ...metadata,
              });
            }
          }
        } catch (e) {
          error({
            code: 'EvidenceRetrievalError',
            error: e as Error,
          });
        }
      }

      this.logger.save();
    });

    return this;
  }

  public onRetrieved(
    listener: (retrievalResult: Result<VerificationEvidence[]>) => void,
  ): this {
    this.events.on(EventType.RETRIEVED, listener);
    return this;
  }

  public async retrieve(
    claimContent: string,
  ): Promise<
    Result<{ evidences: VerificationEvidence[]; metadata?: WebSearchMetadata }>
  > {
    if (this.isDevMode) return this.retrieveOnDevMode(claimContent);
    const { metadata, contents: evidences } = await this.webSearch.search(
      claimContent,
      {
        system: RETRIEVE_EVIDENCES_PROMPT,
      },
    );

    return {
      evidences,
      metadata,
    };
  }

  private get isDevMode(): boolean {
    const { devMode } = loadConfig();
    return devMode.claimVerification ?? devMode.default;
  }

  private async retrieveOnDevMode(
    claim: string,
  ): Promise<{ evidences: VerificationEvidence[] }> {
    const { evidences } = await import('/mock/evidence-retrieval.json');
    const count = Math.floor(Math.random() * 5) + 1;

    const picked = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * evidences.length);
      picked.push(evidences[idx]);
    }

    return {
      evidences: picked,
    };
  }
}
