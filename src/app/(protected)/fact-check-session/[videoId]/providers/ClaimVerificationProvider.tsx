'use client';
import useStreamingResponse from '@/hooks/useStreamingResponse';
import { ClaimVerification } from '@/models/claim-verification';
import assert from 'assert';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useClaim } from './ClaimProvider';
import { VerifyClaimsRequestDto } from '@/gateway/dto/claim';
import { APIRoutes } from '@/constants/routes';
import { FactCheckSession } from '@/models/fact-check-session';
import { Claim } from '@/models/claim';

export interface IClaimVerification {
  items: ClaimVerification[];
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
  clear: () => void;
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

  const append = useCallback((data: ClaimVerification[]) => {
    setItems((prev) => [...prev, ...data]);
  }, []);

  const remove = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const { isLoading, startStreaming, stopStreaming } = useStreamingResponse(
    (chunks: unknown[]) => {
      append(chunks as ClaimVerification[]);
    },
  );

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

  const { items: claims } = useClaim();

  const start = useCallback(async () => {
    const hasClaimToVerify = claimIdsToVerify.length > 0;
    if (!hasClaimToVerify) {
      alert('검증할 주장을 선택해주세요!');
      return;
    }

    const claimsToVerify = claimIdsToVerify
      .map((id) => claims.find((claim) => claim.id === id))
      .filter((claim): claim is Claim => claim !== undefined);

    const dto = {
      factCheckSessionId: factCheckSession.id,
      claims: claimsToVerify,
    } satisfies VerifyClaimsRequestDto;

    await startStreaming(
      APIRoutes.factCheckSessions.CLAIM_VERIFICATIONS(factCheckSession.id),
      dto,
    );

    setClaimIdsToVerify([]);
  }, [claimIdsToVerify, claims, factCheckSession.id, startStreaming]);

  const value: IClaimVerification = useMemo(
    () => ({
      items,
      isLoading,
      claimIdsToVerify,
      start,
      stop: stopStreaming,
      addClaimToVerify,
      removeClaimToVerify,
      addClaimsToVerifyBulk,
      removeClaimsToVerifyBulk,
      resetClaimsToVerify,
      remove,
      clear,
    }),
    [
      items,
      isLoading,
      claimIdsToVerify,
      start,
      stopStreaming,
      addClaimToVerify,
      removeClaimToVerify,
      addClaimsToVerifyBulk,
      removeClaimsToVerifyBulk,
      resetClaimsToVerify,
      remove,
      clear,
    ],
  );

  return (
    <ClaimVerificationContext.Provider value={value}>
      {children}
    </ClaimVerificationContext.Provider>
  );
}

export const useClaimVerification = () => {
  const value = useContext(ClaimVerificationContext);
  assert(value, `${ClaimVerificationProvider.name} not found in the hierarchy`);
  return value;
};
