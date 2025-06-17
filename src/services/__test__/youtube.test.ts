import { describe, expect, it } from 'vitest';
import YoutubeService from '../youtube';
import { isFailure } from '@/result';

describe('YoutubeService', () => {
  describe('generateTranscript', () => {
    it('should generate transcript', async () => {
      const result = await YoutubeService.generateTranscript('_xL6ILW8VGQ');
      if (isFailure(result)) {
        expect(false).toBe(true);
        return;
      }

      console.log(result);
      expect(result.text.length).toBeGreaterThan(0);
    });
  }, 100000);
});
