import { SpeechProcess, SpeechProcessOptions, SpeechToTextResult } from './SpeechProcess';

export class WebSpeechProcess extends SpeechProcess {
  private synthesis: SpeechSynthesis | null = null;
  private recognition: SpeechRecognition | null = null;

  constructor() {
    super();
    if (typeof window !== 'undefined') {
      this.synthesis = window.speechSynthesis;
      this.recognition = new window.webkitSpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }
  }

  async textToSpeech(text: string, options: SpeechProcessOptions = {}): Promise<void> {
    if (!this.synthesis) throw new Error('Speech synthesis not available');

    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options.language || 'en-US';
      utterance.pitch = options.pitch || 1;
      utterance.rate = options.rate || 1;
      utterance.volume = options.volume || 1;

      utterance.onend = () => resolve();
      utterance.onerror = (error: Event) => reject(error);

      this.synthesis?.speak(utterance);
    });
  }

  async speechToText(options: SpeechProcessOptions = {}): Promise<SpeechToTextResult> {
    if (!this.recognition) throw new Error('Speech recognition not available');

    this.recognition.lang = options.language || 'en-US';

    return new Promise((resolve, reject) => {
      this.recognition!.onresult = (event: SpeechRecognitionEvent) => {
        const result = event.results[0][0];
        resolve({
          text: result.transcript,
          confidence: result.confidence,
        });
      };

      this.recognition!.onerror = (error: Event) => reject(error);
      this.recognition!.start();
    });
  }

  stopSpeaking(): void {
    this.synthesis?.cancel();
  }

  stopListening(): void {
    this.recognition?.stop();
  }
} 