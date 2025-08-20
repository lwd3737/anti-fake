import { formatDateTime } from '@/utils/date';
import { logJsonFile } from './file';
import { LanguageModelUsage } from 'ai';

interface LogInfo {
  title: string;
  description?: string;
}

type HistoryRecord = UsageRecord | ErrorRecord;

interface UsageRecord {
  title: string;
  description?: string;
  model: string;
  prompt: string;
  output: any;
  context?: Record<string, any>;
  tokenUsage: LanguageModelUsage;
  generationTime: number;
  createdAt: string;
}

type RawUsageRecord = Omit<UsageRecord, 'generationTime' | 'createdAt'>;

export interface TokenUsage {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

interface ErrorRecord {
  code: string;
  error: Error;
  context?: Record<string, any>;
}

export default class LLMHistoryLogger {
  private history: HistoryRecord[] = [];

  constructor(
    private fileName: string,
    private info: LogInfo,
  ) {
    this.save = this.save.bind(this);
  }

  public async monitor<R = unknown>(
    task: (
      log: (record: RawUsageRecord) => Promise<void>,
      error: (record: ErrorRecord) => Promise<void>,
      save: () => Promise<void>,
    ) => Promise<R>,
  ): Promise<R> {
    const startedAt = new Date();

    return await task(
      // log
      async (record) => {
        const endedAt = new Date();

        this.history = [
          ...this.history,
          {
            ...record,
            generationTime: endedAt.getTime() - startedAt.getTime(),
            createdAt: endedAt.toISOString(),
          },
        ];
      },
      // error
      async (record) => {
        this.history = [...this.history, record];
      },

      this.save,
    );
  }

  public async save(): Promise<void> {
    const createdAt = new Date();

    await logJsonFile(
      `logs/${this.fileName}-${formatDateTime(createdAt)}.json`,
      {
        ...this.info,
        usageHistory: this.history,
        createdAt,
      },
    );

    this.history = [];
  }
}
