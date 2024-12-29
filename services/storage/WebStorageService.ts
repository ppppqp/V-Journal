import { generateId } from '@/utils/random';
import { StorageService, StorageServiceOptions } from './StorageService';
import { DiaryEntry } from '@/types/diary';

export class WebStorageService extends StorageService {
  private namespace: string;

  constructor(options: StorageServiceOptions = {}) {
    super();
    this.namespace = options.namespace || 'vjournal';
  }

  private getKey(id: string): string {
    return `${this.namespace}_diary_${id}`;
  }

  private getIndexKey(): string {
    return `${this.namespace}_diary_index`;
  }

  async createDiary(): Promise<DiaryEntry> {
    const newDiary: DiaryEntry = {
      id: generateId(),
      date: new Date().toISOString(),
      tags: [],
      conversation: {
        id: generateId(),
        date: new Date().toISOString(),
        messages: [],
      },
      lastModified: Date.now(),
    };

    await this.saveDiary(newDiary);
    return newDiary;
  }

  async saveDiary(diary: DiaryEntry): Promise<void> {
    try {
      diary.lastModified = Date.now();
      localStorage.setItem(this.getKey(diary.id), JSON.stringify(diary));

      const index = await this.listDiaries();
      if (!index.find(d => d.id === diary.id)) {
        localStorage.setItem(
          this.getIndexKey(),
          JSON.stringify([...index.map(d => ({
            id: d.id,
            date: d.date,
            lastModified: d.lastModified,
          })), {
            id: diary.id,
            date: diary.date,
            lastModified: diary.lastModified,
          }])
        );
      }
    } catch (error) {
      console.error('Failed to save diary:', error);
      throw new Error('Failed to save diary');
    }
  }

  async loadDiary(id: string): Promise<DiaryEntry | null> {
    try {
      const data = localStorage.getItem(this.getKey(id));
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to load diary:', error);
      throw new Error('Failed to load diary');
    }
  }

  async listDiaries(): Promise<DiaryEntry[]> {
    try {
      const indexData = localStorage.getItem(this.getIndexKey());
      const index = indexData ? JSON.parse(indexData) : [];
      const diaries = await Promise.all(
        index.map(({ id }: { id: string }) => this.loadDiary(id))
      );
      return diaries
        .filter((d): d is DiaryEntry => d !== null)
        .sort((a, b) => b.lastModified - a.lastModified);
    } catch (error) {
      console.error('Failed to list diaries:', error);
      throw new Error('Failed to list diaries');
    }
  }

  async deleteDiary(id: string): Promise<void> {
    try {
      localStorage.removeItem(this.getKey(id));
      const index = await this.listDiaries();
      localStorage.setItem(
        this.getIndexKey(),
        JSON.stringify(index
          .filter(d => d.id !== id)
          .map(d => ({
            id: d.id,
            date: d.date,
            lastModified: d.lastModified,
          }))
        )
      );
    } catch (error) {
      console.error('Failed to delete diary:', error);
      throw new Error('Failed to delete diary');
    }
  }
} 