import { create } from 'zustand';
import { WebSpeechProcess } from '../services/speech/WebSpeechProcess';
import { WebStorageService } from '../services/storage/WebStorageService';
import { ConversationMessage } from '../types/conversation';
import { DiaryEntry } from '../types/diary';

interface AppState {
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  currentQuestion: string;
  setCurrentQuestion: (question: string) => void;
  speechText: string;
  setSpeechText: (text: string) => void;
  currentDiary: DiaryEntry | null;
  diaries: DiaryEntry[];
  setCurrentDiary: (diary: DiaryEntry | null) => void;
  loadDiaries: () => Promise<void>;
  createNewDiary: () => Promise<void>;
  saveDiary: () => Promise<void>;
  addMessage: (message: Omit<ConversationMessage, 'id' | 'timestamp'>) => void;
  speechProcess: WebSpeechProcess;
  storageService: WebStorageService;
  loadDiary: (id: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  isRecording: false,
  setIsRecording: (value) => set({ isRecording: value }),
  currentQuestion: 'How was your day overall?',
  setCurrentQuestion: (question) => {
    set({ currentQuestion: question });
    // Add assistant message when question changes
    const state = get();
    if (state.currentDiary) {
      state.addMessage({
        type: 'assistant',
        content: question,
      });
    }
  },
  speechText: '',
  setSpeechText: (text) => set({ speechText: text }),
  currentDiary: null,
  diaries: [],
  setCurrentDiary: (diary) => set({ currentDiary: diary }),

  addMessage: (message) => set((state) => {
    if (!state.currentDiary) return state;

    const newMessage: ConversationMessage = {
      ...message,
      id: Math.random().toString(36).substring(7),
      timestamp: Date.now(),
    };

    const updatedDiary: DiaryEntry = {
      ...state.currentDiary,
      lastModified: Date.now(),
      conversation: {
        ...state.currentDiary.conversation,
        messages: [...state.currentDiary.conversation.messages, newMessage],
      },
    };

    // Auto-save after adding message
    state.saveDiary();
    
    return { currentDiary: updatedDiary };
  }),

  loadDiaries: async () => {
    const { storageService } = get();
    const diaries = await storageService.listDiaries();
    set({ diaries });
  },

  createNewDiary: async () => {
    const { storageService, setCurrentDiary, setCurrentQuestion } = get();
    const newDiary = await storageService.createDiary();
    setCurrentDiary(newDiary);
    setCurrentQuestion('How was your day overall?');
  },

  saveDiary: async () => {
    const { storageService, currentDiary, loadDiaries } = get();
    if (currentDiary) {
      await storageService.saveDiary(currentDiary);
      await loadDiaries();
    }
  },

  speechProcess: new WebSpeechProcess(),
  storageService: new WebStorageService(),

  loadDiary: async (id: string) => {
    const { storageService, setCurrentDiary } = get();
    const diary = await storageService.loadDiary(id);
    if (diary) {
      setCurrentDiary(diary);
    }
  },
})); 