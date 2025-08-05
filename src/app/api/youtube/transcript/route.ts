import { GenerateTranscriptResponseDto } from '@/gateway/dto/youttube';
import { handleRouteError } from '@/gateway/error/reponse-error-handler';
import { isFailure } from '@/result';
import YoutubeService from '@/services/youtube';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { videoId } = await req.json();

  const transcriptResult =
    await new YoutubeService().generateTranscriptFromVideo(videoId);
  if (isFailure(transcriptResult)) {
    const failure = transcriptResult;
    return handleRouteError(
      failure.code,
      failure.message,
      500,
      failure.context,
    );
  }

  const transcript = transcriptResult;

  return NextResponse.json({
    summary: transcript.summary,
  } as GenerateTranscriptResponseDto);
}
