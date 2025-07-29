'use client';
import {
  deleteClaims,
  getClaims,
} from '@/app/api/fact-check-sessions/[factCheckSessionId]/claims/fetch';
import { APIRoutes, PageRoutes } from '@/constants/routes';
import {
  ClaimResponseChunkDto,
  CreateClaimsErrorDto,
  CreateClaimsRequestDto,
} from '@/gateway/dto/claim';
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
  items: Claim[];
  error: CreateClaimsErrorDto | null;
  isLoading: boolean;
  stop: () => void;
  remove: (index: number) => void;
  retry: () => Promise<void>;
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
  const [items, setItems] = useState<Claim[]>([]);

  const { isLoading, error, startStreaming, stopStreaming } =
    useStreamingResponse<ClaimResponseChunkDto, CreateClaimsErrorDto>(
      (chunks) => {
        setItems((prev) => [...prev, ...chunks]);
      },
    );

  const isMountedRef = useRef(false);

  useEffect(
    function getClaimsOnMount() {
      if (isMountedRef.current) return;
      isMountedRef.current = true;

      getClaims(factCheckSession.id).then(async (result) => {
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
          setItems(claims);
          return;
        }

        await startStreaming<CreateClaimsRequestDto>(
          APIRoutes.factCheckSessions.claims(factCheckSession.id),
          {
            contentType: ContentType.YOUTUBE_VIDEO,
            contentId: factCheckSession.contentId,
          },
        );
      });
    },
    [router, startStreaming, factCheckSession.contentId, factCheckSession.id],
  );

  useEffect(
    function handleError() {
      if (!error) return;
      switch (error.code) {
        case ErrorCode.UNAUTHORIZATION:
          router.replace(PageRoutes.HOME);
          return;
        case ErrorCode.FACT_CHECK_SESSION_NOT_FOUND:
          alert('팩트 체크 세션을 찾을 수 없습니다.');
          router.replace(PageRoutes.HOME);
          return;
        case ErrorCode.YOUTUBE_VIDEO_NOT_FOUND:
          alert('유튜브 비디오를 찾을 수 없습니다.');
          router.replace(PageRoutes.HOME);
          return;
      }
    },
    [error],
  );

  const remove = useCallback(async (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const retry = useCallback(async () => {
    setItems([]);

    const deleteResult = await deleteClaims(factCheckSession.id);
    if (isFailure(deleteResult)) {
      alert('팩트 체크 세션을 초기화하는데 실패했습니다.');
      return;
    }

    await startStreaming<CreateClaimsRequestDto>(
      APIRoutes.factCheckSessions.claims(factCheckSession.id),
      {
        contentType: ContentType.YOUTUBE_VIDEO,
        contentId: factCheckSession.contentId,
      },
    );
  }, [factCheckSession.contentId, factCheckSession.id, startStreaming]);

  const value: IClaimProvider = useMemo(
    () => ({
      items,
      isLoading,
      error,
      stop: stopStreaming,
      remove,
      retry,
    }),
    [items, isLoading, remove, retry, stopStreaming, error],
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
