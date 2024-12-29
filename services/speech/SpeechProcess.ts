export interface SpeechProcessOptions {
  language?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
  onResult?: (result: SpeechToTextResult) => void;
}

export interface SpeechToTextResult {
  text: string;
  confidence: number;
  isFinal: boolean;
}

export abstract class SpeechProcess {
  abstract textToSpeech(text: string, options?: SpeechProcessOptions): Promise<void>;
  abstract startListening(options?: SpeechProcessOptions): void;
  abstract stopListening(): void;
  abstract stopSpeaking(): void;
} 