import { create } from 'zustand';
import { WebSpeechProcess } from '../services/speech/WebSpeechProcess';

interface AppState {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  currentQuestion: string;
  setCurrentQuestion: (question: string) => void;
  speechText: string;
  setSpeechText: (text: string) => void;
  speechProcess: WebSpeechProcess;
}

export const useStore = create<AppState>((set) => ({
  isRecording: false,
  setIsRecording: (value) => set({ isRecording: value }),
  currentQuestion: 'How was your day overall?',
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  speechText: '',
  setSpeechText: (text) => set({ speechText: text }),
  speechProcess: new WebSpeechProcess(),
})); 