'use client';
import { ClaimVerification } from '@/models/claim-verification';
import assert from 'assert';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { VerifyClaimsRequestDto } from '@/gateway/dto/claim';
import { APIRoutes } from '@/constants/routes';
import { FactCheckSession } from '@/models/fact-check-session';
import { Claim } from '@/models/claim';
import {
  deleteClaimVerifications,
  getClaimVerifications,
} from '@/app/api/fact-check-sessions/[factCheckSessionId]/claim-verifications/fetch';
import { isFailure } from '@/result';
import { VerifyClaimMessageDto } from '@/gateway/dto/claim-verification';
import { useClaim } from './ClaimProvider';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { ErrorCode } from '@/gateway/error/error-code';

export interface IClaimVerification {
  items: ClaimVerification[];
  errors: ClaimVerificationError[];
  isLoading: boolean;
  claimIdsToVerify: string[];
  start: () => void;
  stop: () => void;
  addClaimToVerify: (id: string) => void;
  removeClaimToVerify: (id: string) => void;
  addClaimsToVerifyBulk: (ids: string[]) => void;
  removeClaimsToVerifyBulk: (ids: string[]) => void;
  resetClaimsToVerify: () => void;
  remove: (index: number) => void;
  clear: () => Promise<void>;
}

export interface ClaimVerificationError {
  claimId: string;
  message: string;
}

const ClaimVerificationContext = createContext<IClaimVerification | undefined>(
  undefined,
);

export default function ClaimVerificationProvider({
  children,
  factCheckSession,
}: {
  children: ReactNode;
  factCheckSession: FactCheckSession;
}) {
  const [items, setItems] = useState<ClaimVerification[]>([]);
  const [errors, setErrors] = useState<ClaimVerificationError[]>([]);

  const { status, sendMessage, stop } = useChat<VerifyClaimMessageDto>({
    transport: new DefaultChatTransport({
      api: APIRoutes.factCheckSessions.CLAIM_VERIFICATIONS(factCheckSession.id),
    }),
    onData(part) {
      switch (part.type) {
        case 'data-claim-verification': {
          setItems((prev) => [...prev, part.data.claimVerification]);
          break;
        }
        case 'data-error': {
          const { code, claimId } = part.data;

          let errorMessage: string;
          switch (code) {
            case ErrorCode.EVIDENCE_RETRIEVAL_FAILED:
              errorMessage = '증거 조회를 실패했습니다.';
              break;
            case ErrorCode.CLAIM_VERIFICATIONS_CREATE_FAILED:
              errorMessage = '주장 검증을 실패했습니다.';
              break;
          }

          setErrors((prev) => [
            ...prev,
            {
              claimId,
              message: errorMessage,
            },
          ]);
          break;
        }
      }
    },
  });

  const remove = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(async () => {
    setItems([]);
    await deleteClaimVerifications(factCheckSession.id);
  }, [factCheckSession.id]);

  const [claimIdsToVerify, setClaimIdsToVerify] = useState<string[]>([]);

  const addClaimToVerify = useCallback((id: string) => {
    setClaimIdsToVerify((prev) => Array.from(new Set([...prev, id])));
  }, []);

  const removeClaimToVerify = useCallback((id: string) => {
    setClaimIdsToVerify((prev) => prev.filter((_id) => _id !== id));
  }, []);

  const addClaimsToVerifyBulk = useCallback((ids: string[]) => {
    setClaimIdsToVerify((prev) => Array.from(new Set([...prev, ...ids])));
  }, []);

  const removeClaimsToVerifyBulk = useCallback((ids: string[]) => {
    setClaimIdsToVerify((prev) => prev.filter((id) => !ids.includes(id)));
  }, []);

  const resetClaimsToVerify = useCallback(() => {
    setClaimIdsToVerify([]);
  }, []);

  const claim = useClaim();

  const start = useCallback(async () => {
    const hasClaimToVerify = claimIdsToVerify.length > 0;
    if (!hasClaimToVerify) {
      alert('검증할 주장을 선택해주세요!');
      return;
    }

    const claimsToVerify = claimIdsToVerify
      .map((id) => claim.items.find((claim) => claim.id === id))
      .filter((claim): claim is Claim => claim !== undefined);

    await sendMessage(
      {
        text: '',
      },
      {
        body: {
          claims: claimsToVerify,
        } as VerifyClaimsRequestDto,
      },
    );
    setClaimIdsToVerify([]);
  }, [claimIdsToVerify, claim.items, sendMessage]);

  useEffect(
    function getVerificationsOnMount() {
      getClaimVerifications(factCheckSession.id).then((result) => {
        if (isFailure(result)) {
          alert('주장 검증을 불러오는데 실패했습니다.');
          return;
        }

        setItems(result.claimVerifications);
      });
    },
    [factCheckSession.id],
  );

  return (
    <ClaimVerificationContext.Provider
      value={{
        items,
        errors,
        isLoading: status === 'streaming',
        claimIdsToVerify,
        start,
        stop,
        addClaimToVerify,
        removeClaimToVerify,
        addClaimsToVerifyBulk,
        removeClaimsToVerifyBulk,
        resetClaimsToVerify,
        remove,
        clear,
      }}
    >
      {children}
    </ClaimVerificationContext.Provider>
  );
}

export const useClaimVerification = () => {
  const value = useContext(ClaimVerificationContext);
  assert(value, `${ClaimVerificationProvider.name} not found in the hierarchy`);
  return value;
};
