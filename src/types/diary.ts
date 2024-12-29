export interface DiaryEntry {
  id: string;
  date: string;
  content: {
    question: string;
    answer: string;
  }[];
  summary?: string;
  mood?: string;
  tags?: string[];
}

export interface Question {
  id: string;
  text: string;
  followUpQuestions?: string[];
} 