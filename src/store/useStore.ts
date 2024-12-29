import { create } from 'zustand';

interface AppState {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  currentQuestion: string;
  setCurrentQuestion: (question: string) => void;
}

export const useStore = create<AppState>((set) => ({
  isRecording: false,
  setIsRecording: (value) => set({ isRecording: value }),
  currentQuestion: 'How was your day overall?',
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
})); 