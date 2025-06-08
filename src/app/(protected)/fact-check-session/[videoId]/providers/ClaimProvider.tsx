'use client';
import {
  deleteClaims,
  getClaims,
} from '@/app/api/fact-check-sessions/[factCheckSessionId]/claims/fetch';
import { APIRoutes, PageRoutes } from '@/constants/routes';
import { CreateClaimsRequestDto } from '@/gateway/dto/claim';
import { ErrorCode } from '@/gateway/error/error-code';
import useStreamingResponse from '@/hooks/useStreamingResponse';
import { Claim } from '@/models/claim';
import { ContentType, FactCheckSession } from '@/models/fact-check-session';
import { isFailure } from '@/result';
import assert from 'assert';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export interface IClaimProvider {
  claims: Claim[];
  isLoading: boolean;
  stop: () => void;
  remove: (index: number) => void;
  retry: () => void;
}

const ClaimDetectionContext = createContext<IClaimProvider | undefined>(
  undefined,
);

export default function ClaimProvider({
  factCheckSession,
  children,
}: {
  children: ReactNode;
  factCheckSession: FactCheckSession;
}) {
  const router = useRouter();
  const [claims, setClaims] = useState<Claim[]>([]);

  const { isLoading, startStreaming, stopStreaming } = useStreamingResponse(
    (chunks: unknown[]) => {
      setClaims((prev) => [...prev, ...(chunks as Claim[])]);
    },
  );

  const isMountedRef = useRef(false);

  useEffect(
    function detectClaimsOnMount() {
      if (isMountedRef.current) return;
      isMountedRef.current = true;

      getClaims(factCheckSession.id).then((result) => {
        if (isFailure(result)) {
          console.error(result);

          switch (result.code) {
            case ErrorCode.UNAUTHENTICATED:
              alert('로그인이 필요합니다.');
              router.replace(PageRoutes.LOGIN);
              return;
            case ErrorCode.UNAUTHORIZATION:
              alert('권한이 없습니다.');
              router.replace(PageRoutes.HOME);
              return;
            case ErrorCode.FACT_CHECK_SESSION_NOT_FOUND:
              alert('팩트 체크 세션을 찾을 수 없습니다.');
              router.replace(PageRoutes.HOME);
              return;
            default:
              alert('오류가 발생했습니다.');
              return;
          }
        }

        const { claims } = result;
        if (result.claims.length > 0) {
          setClaims(claims);
          return;
        }

        startStreaming<CreateClaimsRequestDto>(
          APIRoutes.factCheckSessions.claims(factCheckSession.id),
          {
            userId: factCheckSession.userId,
            contentType: ContentType.YOUTUBE_VIDEO,
            contentId: factCheckSession.contentId,
          },
        );
      });
    },
    [
      router,
      startStreaming,
      factCheckSession.contentId,
      factCheckSession.id,
      factCheckSession.userId,
    ],
  );

  const remove = useCallback((index: number) => {
    setClaims((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const retry = useCallback(async () => {
    setClaims([]);
    const deletionResult = await deleteClaims(factCheckSession.id);
    if (isFailure(deletionResult)) {
      alert('팩트 체크 세션을 초기화하는데 실패했습니다.');
      return;
    }

    startStreaming<CreateClaimsRequestDto>(
      APIRoutes.factCheckSessions.claims(factCheckSession.id),
      {
        userId: factCheckSession.userId,
        contentType: ContentType.YOUTUBE_VIDEO,
        contentId: factCheckSession.contentId,
      },
    );
  }, [
    factCheckSession.contentId,
    factCheckSession.id,
    factCheckSession.userId,
    startStreaming,
  ]);

  const value: IClaimProvider = useMemo(
    () => ({
      claims,
      isLoading,
      stop: stopStreaming,
      remove,
      retry,
    }),
    [claims, isLoading, remove, retry, stopStreaming],
  );

  return (
    <ClaimDetectionContext.Provider value={value}>
      {children}
    </ClaimDetectionContext.Provider>
  );
}

export const useClaim = () => {
  const value = useContext(ClaimDetectionContext);
  assert(value, `${ClaimProvider.name} not found`);
  return value;
};
