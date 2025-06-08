import loadConfig from '@/config';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';

export enum AIModel {
  GPT_4O = 'gpt-4o',
  GPT_4O_MINI = 'gpt-4o-mini',
  GEMINI_1_5_FLASH = 'gemini-1.5-flash',
  GEMINI_2_5_FLASH = 'gemini-2.5-flash-preview-05-20',
}

export const openai = createOpenAI({
  apiKey: loadConfig().openai.apiKey,
});

export const gemini = createGoogleGenerativeAI({
  apiKey: loadConfig().google.gemini.apiKey,
});
