import { DiaryEntry } from '@/types/diary';

export interface StorageServiceOptions {
  namespace?: string;
}

export abstract class StorageService {
  abstract createDiary(): Promise<DiaryEntry>;
  abstract saveDiary(diary: DiaryEntry): Promise<void>;
  abstract loadDiary(id: string): Promise<DiaryEntry | null>;
  abstract listDiaries(): Promise<DiaryEntry[]>;
  abstract deleteDiary(id: string): Promise<void>;
} 