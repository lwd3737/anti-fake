import { describe, expect, it } from 'vitest';
import Youtube from '../youtube';
import { isFailure } from '@/result';

describe('Youtube lib', () => {
  it('should generate short transcript by curl without chunking', async () => {
    const videoId = '7giK7wp8hxg';
    const transcriptResult = await Youtube.generateTranscript(videoId);
    if (isFailure(transcriptResult)) expect(false).toBeTruthy();

    console.log('transcript', transcriptResult);
    expect(transcriptResult).toBeDefined();
  }, 100000);

  it('should generate long transcript', async () => {
    const transcriptResult = await Youtube.generateTranscript('gKktfq7v03o'); // 20분 영상
    if (isFailure(transcriptResult)) {
      expect(false).toBeTruthy();
      return;
    }

    expect(transcriptResult).toBeDefined();
  }, 200000);
});
