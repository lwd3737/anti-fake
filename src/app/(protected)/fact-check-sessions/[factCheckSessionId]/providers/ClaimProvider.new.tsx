'use client';
import { getClaims } from '@/app/api/fact-check-sessions/[factCheckSessionId]/claims/fetch';
import { APIRoutes, PageRoutes } from '@/constants/routes';
import { CreateClaimMessageDto } from '@/gateway/dto/claim';
import { ErrorCode } from '@/gateway/error/error-code';
import { Claim } from '@/models/claim';
import { ContentType, FactCheckSession } from '@/models/fact-check-session';
import { isFailure } from '@/result';
import { useChat } from '@ai-sdk/react';
import { ChatStatus, DefaultChatTransport } from 'ai';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export type ClaimStatus = ChatStatus;

type ClaimErrors = {
  [ErrorCode.CLAIM_CREATE_FAILED]?: { message: string; count: number };
};

const ClaimContext = createContext<
  | {
      videoSummary: string | null;
      items: Claim[];
      status: ClaimStatus;
      errors: ClaimErrors;
      stop: () => Promise<void>;
      retry: () => Promise<void>;
      remove: (index: number) => Promise<void>;
    }
  | undefined
>(undefined);

export default function New__ClaimProvider({
  children,
  factCheckSession,
}: {
  children: ReactNode;
  factCheckSession: FactCheckSession;
}) {
  const router = useRouter();

  const [videoSummary, setVideoSummary] = useState<string | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [errors, setErrors] = useState<ClaimErrors>({});

  const {
    sendMessage,
    status,
    stop: stopStream,
  } = useChat<CreateClaimMessageDto>({
    transport: new DefaultChatTransport({
      api: APIRoutes.factCheckSessions.claims(factCheckSession.id),
      body: {
        contentType: ContentType.YOUTUBE_VIDEO,
        contentId: factCheckSession.contentId,
      },
    }),
    onData(part) {
      switch (part.type) {
        case 'data-ready': {
          setVideoSummary(part.data.summary);
          break;
        }
        case 'data-claim': {
          setClaims((prev) => [...prev, part.data.claim]);
          break;
        }
        case 'data-error': {
          const { code, message } = part.data;
          setErrors((prev) => ({
            ...prev,
            [code]: {
              message: '주장 생성을 실패했습니다.',
              count: (prev[code]?.count ?? 0) + 1,
            },
          }));
          console.debug(code, message);
          break;
        }
        default:
          break;
      }
    },
    onError(error) {
      console.error('Unknown error', error);
    },
  });

  // TODO: 에러 단순화 필요
  useEffect(
    function getClaimsOnMount() {
      getClaims(factCheckSession.id).then((result) => {
        if (isFailure(result)) {
          const { code, message } = result;
          console.error(message);

          switch (code) {
            case ErrorCode.UNAUTHORIZATION:
              alert('권한이 없습니다.');
              router.replace(PageRoutes.HOME);
              return;
            case ErrorCode.FACT_CHECK_SESSION_NOT_FOUND:
              alert('팩트 체크 세션을 찾을 수 없습니다.');
              router.replace(PageRoutes.HOME);
              return;
            case ErrorCode.YOUTUBE_VIDEO_NOT_FOUND:
            case ErrorCode.YOUTUBE_VIDEO_GET_FAILED: {
              alert('유튜브 비디오를 찾을 수 없습니다.');
              router.replace(PageRoutes.HOME);
              return;
            }
            case ErrorCode.OPENAI_TRANSCRIPTION_FAILED:
            case ErrorCode.YOUTUBE_TRANSCRIPT_NOT_FOUND:
            case ErrorCode.YOUTUBE_TRANSCRIPTION_FAILED: {
              alert('유튜브 비디오 자막 생성에 실패했습니다.');
              router.replace(PageRoutes.HOME);
              return;
            }
            default:
              alert('오류가 발생했습니다.');
              return;
          }
        }

        const { claims } = result;
        if (claims.length > 0) {
          setClaims(claims);
          return;
        }

        sendMessage();
      });
    },
    [factCheckSession.id, router, sendMessage],
  );

  const stop = useCallback(async () => {
    await stopStream();
  }, [stopStream]);

  const retry = useCallback(async () => {
    setErrors({});
    setClaims([]);
    await sendMessage();
  }, [sendMessage]);

  const remove = useCallback(
    async (index: number) => {
      setClaims((prev) => prev.filter((_, i) => i !== index));
      // TODO: DB 삭제 요청
    },
    [setClaims],
  );

  return (
    <ClaimContext.Provider
      value={{
        videoSummary,
        items: claims,
        status,
        errors,
        stop,
        retry,
        remove,
      }}
    >
      {children}
    </ClaimContext.Provider>
  );
}

export const useClaim = () => {
  const context = useContext(ClaimContext);
  if (!context) {
    throw new Error('useClaim must be used within a ClaimProvider');
  }
  return context;
};
