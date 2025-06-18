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

export interface IClaimVerification {
  items: ClaimVerification[];
  isLoading: boolean;
  // claimIndexesToVerify: number[];
  claimIdsToVerify: string[];
  start: () => void;
  stop: () => void;
  // addClaimToVerify: (index: number) => void;
  // removeClaimToVerify: (index: number) => void;
  // addClaimsToVerifyBulk: (indexes: number[]) => void;
  // removeClaimsToVerifyBulk: (indexes: number[]) => void;
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
}: {
  children: ReactNode;
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

  // const [claimIndexesToVerify, setClaimIndexesToVerify] = useState<number[]>(
  //   [],
  // );
  const [claimIdsToVerify, setClaimIdsToVerify] = useState<string[]>([]);

  // const addClaimToVerify = useCallback((index: number) => {
  //   setClaimIndexesToVerify((prev) => Array.from(new Set([...prev, index])));
  // }, []);
  const addClaimToVerify = useCallback((id: string) => {
    setClaimIdsToVerify((prev) => Array.from(new Set([...prev, id])));
  }, []);

  // const removeClaimToVerify = useCallback((index: number) => {
  //   setClaimIndexesToVerify((prev) =>
  //     prev.filter((_index) => _index !== index),
  //   );
  // }, []);

  const removeClaimToVerify = useCallback((id: string) => {
    setClaimIdsToVerify((prev) => prev.filter((_id) => _id !== id));
  }, []);

  // const addClaimsToVerifyBulk = useCallback((indexes: number[]) => {
  //   setClaimIndexesToVerify((prev) =>
  //     Array.from(new Set([...prev, ...indexes])),
  //   );
  // }, []);

  const addClaimsToVerifyBulk = useCallback((ids: string[]) => {
    setClaimIdsToVerify((prev) => Array.from(new Set([...prev, ...ids])));
  }, []);

  // const removeClaimsToVerifyBulk = useCallback((indexes: number[]) => {
  //   setClaimIndexesToVerify((prev) =>
  //     prev.filter((index) => !indexes.includes(index)),
  //   );
  // }, []);

  const removeClaimsToVerifyBulk = useCallback((ids: string[]) => {
    setClaimIdsToVerify((prev) => prev.filter((id) => !ids.includes(id)));
  }, []);

  // const resetClaimsToVerify = useCallback(() => {
  //   setClaimIndexesToVerify([]);
  // }, []);

  const resetClaimsToVerify = useCallback(() => {
    setClaimIdsToVerify([]);
  }, []);

  const { items: claims } = useClaim();

  const start = useCallback(async () => {
    // const hasClaimToVerify = claimIndexesToVerify.length > 0;
    const hasClaimToVerify = claimIdsToVerify.length > 0;
    if (!hasClaimToVerify) {
      alert('검증할 주장을 선택해주세요!');
      return;
    }

    // const claimsToVerify = claimIndexesToVerify.map((index) => claims[index]);
    const claimsToVerify = claimIdsToVerify.map((id) =>
      claims.find((claim) => claim.id === id),
    );

    const dto = {
      claims: claimsToVerify,
    } as VerifyClaimsRequestDto;

    await startStreaming('verify-claims', dto);

    // setClaimIndexesToVerify([]);
    setClaimIdsToVerify([]);
  }, [claimIdsToVerify, claims, startStreaming]);

  const value: IClaimVerification = useMemo(
    () => ({
      items,
      isLoading,
      // claimIndexesToVerify,
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
    }),
    [
      items,
      isLoading,
      // claimIndexesToVerify,
      claimIdsToVerify,
      start,
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
