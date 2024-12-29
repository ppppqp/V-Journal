export interface SpeechProcessOptions {
  language?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
}

export interface SpeechToTextResult {
  text: string;
  confidence: number;
}

export abstract class SpeechProcess {
  abstract textToSpeech(text: string, options?: SpeechProcessOptions): Promise<void>;
  abstract speechToText(options?: SpeechProcessOptions): Promise<SpeechToTextResult>;
  abstract stopSpeaking(): void;
  abstract stopListening(): void;
} 