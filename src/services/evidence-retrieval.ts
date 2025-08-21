import RETRIEVE_EVIDENCES_PROMPT from '@/prompts/retrieve-evidences';
import GoogleSearch from '../retrievers/google-search';
import { VerificationEvidence } from '@/models/claim-verification';
import { isFailure, Result } from '@/result';
import { Claim } from '@/models/claim';
import { WebSearchMetadata } from '@/models/web-search';
import { ErrorCode } from '@/gateway/error/error-code';

export default class EvidenceRetrievalService {
  private webSearch;

  constructor(private signal: AbortSignal) {
    this.webSearch = new GoogleSearch(signal);
  }

  public async *retrieveEvidencesStream(
    claims: Claim[],
  ): AsyncGenerator<
    Result<
      VerificationEvidence[],
      ErrorCode.EVIDENCE_RETRIEVAL_FAILED,
      { claimId: string }
    >,
    void,
    unknown
  > {
    for (const claim of claims) {
      const retrievalResult = await this.retrieve(claim.content);

      if (isFailure(retrievalResult)) {
        const failure = retrievalResult;
        yield {
          ...failure,
          context: { claimId: claim.id },
        };

        // TODO: error 로깅
        console.debug(failure);
        continue;
      }

      const { evidences, metadata } = retrievalResult;
      yield evidences;
      // TODO: logger 추가
    }
  }

  public async retrieve(
    claimContent: string,
  ): Promise<
    Result<
      { evidences: VerificationEvidence[]; metadata?: WebSearchMetadata },
      ErrorCode.EVIDENCE_RETRIEVAL_FAILED
    >
  > {
    // if (this.isDevMode) return this.retrieveOnDevMode(claimContent);

    try {
      // throw Error('test');
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
    } catch (error) {
      return {
        code: ErrorCode.EVIDENCE_RETRIEVAL_FAILED,
        message: 'Failed to retrieve evidences from ai',
        context: error as Record<string, any>,
      };
    }
  }
}
