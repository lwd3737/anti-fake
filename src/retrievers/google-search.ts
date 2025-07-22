import loadConfig from '@/config';
import { WebSearchCitation, WebSearchResponse } from '@/models/web-search';
import {
  DynamicRetrievalMode,
  GenerativeModel,
  GoogleGenerativeAI,
  GroundingChunk,
  GroundingMetadata,
} from '@google/generative-ai';
import * as cheerio from 'cheerio';

interface GroundingSource {
  title: string; // domain
  uri: string; // proxy url
}

export default class GoogleSearch {
  private model: GenerativeModel;

  constructor(private signal: AbortSignal) {
    const { google } = loadConfig();
    const ai = new GoogleGenerativeAI(google.gemini.apiKey);

    this.model = ai.getGenerativeModel(
      {
        model: 'gemini-1.5-flash',
        tools: [
          {
            googleSearchRetrieval: {
              dynamicRetrievalConfig: {
                mode: DynamicRetrievalMode.MODE_DYNAMIC,
                dynamicThreshold: 0,
              },
            },
          },
        ],
      },
      { apiVersion: 'v1beta' },
    );
  }

  public async search(
    query: string,
    {
      system,
      temperature = 0,
      mode = 'text',
    }: {
      system?: string;
      temperature?: number;
      mode?: 'json' | 'text';
    },
  ): Promise<WebSearchResponse> {
    const generatedContent = await this.model.generateContent(
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: query }],
          },
        ],
        systemInstruction: system,
        generationConfig: {
          temperature,
        },
        tools: [
          {
            googleSearchRetrieval: {
              dynamicRetrievalConfig: {
                mode: DynamicRetrievalMode.MODE_DYNAMIC,
                dynamicThreshold: 0,
              },
            },
          },
        ],
      },
      {
        signal: this.signal,
      },
    );

    const groundingMetadata = generatedContent.response.candidates?.[0]
      .groundingMetadata as Omit<
      GroundingMetadata,
      'groundingChuncks' | 'groundingSupports'
    > & {
      groundingChunks?: GroundingChunk[];
      groundingSupports?: {
        confidenceScores: number[];
        groundingChunkIndices: number[];
        segment: {
          text?: string;
          startIndex?: number;
          endIndex?: number;
          partIndex?: number;
        };
      }[];
    };

    const { groundingChunks, groundingSupports } = groundingMetadata || {};

    if (!groundingChunks || !groundingSupports) {
      return {
        contents: [],
        metadata: {
          tokenUsage: {
            inputTokens: 0,
            outputTokens: 0,
            totalTokens: 0,
          },
          model: this.model.model,
        },
      };
    }

    const sources = groundingChunks.map(({ web }) => ({
      uri: web!.uri!,
      title: web!.title!,
    }));

    const citations = await this.getCitationBulk(sources);
    const contents = groundingSupports.map((support) => {
      const { segment, groundingChunkIndices } = support;
      const { text } = segment as unknown as { text?: string };

      return {
        summary: text!,
        citations: groundingChunkIndices.map((idx) => citations[idx]),
      };
    });

    const { promptTokenCount, candidatesTokenCount, totalTokenCount } =
      generatedContent.response.usageMetadata ?? {};

    return {
      contents,
      metadata: {
        tokenUsage: {
          inputTokens: promptTokenCount ?? 0,
          outputTokens: candidatesTokenCount ?? 0,
          totalTokens: totalTokenCount ?? 0,
        },
        model: this.model.model,
      },
    };
  }

  private async getCitationBulk(
    sources: GroundingSource[],
  ): Promise<WebSearchCitation[]> {
    const chunkSize = 10;
    const chunksGroup = [];
    for (let i = 0; i < sources.length; i += chunkSize) {
      chunksGroup.push(sources.slice(i, i + chunkSize));
    }

    let result: WebSearchCitation[] = [];
    for (const chunks of chunksGroup) {
      const citationResults = await Promise.allSettled(
        chunks.map(this.getCitation.bind(this)),
      );
      const citations = citationResults
        .filter(
          (result): result is PromiseFulfilledResult<WebSearchCitation> => {
            if (result.status === 'fulfilled') return true;
            console.debug('citation fetch failed', result.reason);
            return false;
          },
        )
        .map((result) => result.value);
      result.push(...citations);
    }

    return result;
  }

  private async getCitation(
    source: GroundingSource,
  ): Promise<WebSearchCitation> {
    const { uri, title: domain } = source;

    const res = await fetch(uri, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_3_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      },
      signal: this.signal,
      // SSL 인증서 검증 우회 및 리다이렉트 제한
      // @ts-ignore - Node.js 환경에서만 사용되는 옵션
      rejectUnauthorized: false,
      // 리다이렉트 횟수 제한
      redirect: 'follow',
      // 타임아웃 설정
      // @ts-ignore
      timeout: 10000,
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get('location');
      if (!location) throw new Error('location header not found');
      console.log('redirecting to', location);
      return this.getCitation({ uri: location, title: domain });
    }

    const html = await res.text();

    const $ = cheerio.load(html);
    const head = $('head');

    const title =
      head.find('meta[property="og:title"]').attr('content') ??
      head.find('title').text();
    const description =
      head.find('meta[property="og:description"]').attr('content') ??
      head.find('meta[name=description]').attr('content');
    const image =
      head.find('link[rel="icon"]').attr('href') ??
      head.find('link[rel="icons"]').attr('href');
    const siteName =
      head.find('meta[property="og:site_name"]').attr('content') ??
      head.find('meta[name="application-name"]').attr('content') ??
      domain;
    const url =
      head.find('meta[property="og:url"]').attr('content') ??
      `https://${domain}`;

    const resolvedImage = image?.startsWith('/')
      ? `${new URL(url).origin}${image}`
      : image;

    return {
      title,
      description,
      imageUrl: resolvedImage ? decodeURIComponent(resolvedImage) : undefined,
      siteName,
      url: decodeURIComponent(url),
    };
  }

  private parseJsonContent(content: string) {
    return JSON.parse(content.replace(/```json|```/g, '').trim());
  }
}
