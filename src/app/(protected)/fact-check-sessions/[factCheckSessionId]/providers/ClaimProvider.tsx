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
import {
  experimental_useObject as useObject,
  useCompletion,
  useChat,
} from '@ai-sdk/react';
import { ClaimSchema } from '@/schemas/claim';
import { ChatStatus, DefaultChatTransport } from 'ai';

// TODO: 인터페이스 변경
export interface IClaimProvider {
  items: Claim[];
  error: Error | undefined;
  status: ChatStatus;
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

  // const { isLoading, error, startStreaming, stopStreaming } =
  //   useStreamingResponse<ClaimResponseChunkDto, CreateClaimsErrorDto>(
  //     (chunks) => {
  //       setItems((prev) => [...prev, ...chunks]);
  //     },
  //   );

  // const {  isLoading, error, handleSubmit } = useCompletion({
  //   api: APIRoutes.factCheckSessions.claims(factCheckSession.id),
  //   body: {
  //     contentType: ContentType.YOUTUBE_VIDEO,
  //     contentId: factCheckSession.contentId,
  //   },
  // });

  // TODO: 추출
  const { messages, sendMessage, status, error, stop } = useChat({
    transport: new DefaultChatTransport({
      api: APIRoutes.factCheckSessions.claims(factCheckSession.id),
      body: {
        contentType: ContentType.YOUTUBE_VIDEO,
        contentId: factCheckSession.contentId,
      },
    }),
  });

  // const { object, error, isLoading, submit, stop } = useObject({
  //   api: APIRoutes.factCheckSessions.claims(factCheckSession.id),
  //   schema: ClaimSchema,
  // });

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

        await sendMessage();

        // submit({
        //   contentType: ContentType.YOUTUBE_VIDEO,
        //   contentId: factCheckSession.contentId,
        // });

        // await startStreaming<CreateClaimsRequestDto>(
        //   APIRoutes.factCheckSessions.claims(factCheckSession.id),
        //   {
        //     contentType: ContentType.YOUTUBE_VIDEO,
        //     contentId: factCheckSession.contentId,
        //   },
        // );
      });
    },
    [router, factCheckSession.contentId, factCheckSession.id, sendMessage],
  );

  useEffect(
    function handleError() {
      if (!error) return;
      // switch (error.code) {
      //   case ErrorCode.UNAUTHORIZATION:
      //     router.replace(PageRoutes.HOME);
      //     return;
      //   case ErrorCode.FACT_CHECK_SESSION_NOT_FOUND:
      //     alert('팩트 체크 세션을 찾을 수 없습니다.');
      //     router.replace(PageRoutes.HOME);
      //     return;
      //   case ErrorCode.YOUTUBE_VIDEO_NOT_FOUND:
      //     alert('유튜브 비디오를 찾을 수 없습니다.');
      //     router.replace(PageRoutes.HOME);
      //     return;
      // }
    },
    [error, router],
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

    await sendMessage();

    // await startStreaming<CreateClaimsRequestDto>(
    //   APIRoutes.factCheckSessions.claims(factCheckSession.id),
    //   {
    //     contentType: ContentType.YOUTUBE_VIDEO,
    //     contentId: factCheckSession.contentId,
    //   },
    // );
    // submit({
    //   contentType: ContentType.YOUTUBE_VIDEO,
    //   contentId: factCheckSession.content  Id,
    // });
  }, [factCheckSession.id, sendMessage]);

  const value: IClaimProvider = useMemo(
    () => ({
      items,
      status,
      error,
      stop,
      remove,
      retry,
    }),
    [items, status, error, stop, remove, retry],
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
