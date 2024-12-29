import { Conversation } from './conversation';

export interface DiaryEntry {
  id: string;
  date: string;
  title?: string;
  summary?: string;
  tags: string[];
  mood?: string;
  conversation: Conversation;
  lastModified: number;
}

export interface Question {
  id: string;
  text: string;
  followUpQuestions?: string[];
} 