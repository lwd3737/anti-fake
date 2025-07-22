import { describe, expect, it } from 'vitest';
import Youtube from '../../libs/youtube';
import { isFailure } from '@/result';

describe('YoutubeService', () => {
  describe('generateTranscript', () => {
    it('should generate transcript', async () => {
      const result = await Youtube.old__generateTranscript('_xL6ILW8VGQ');
      if (isFailure(result)) {
        expect(false).toBe(true);
        return;
      }

      console.log(result);
      expect(result.text.text.length).toBeGreaterThan(0);
    });
  }, 100000);
});
