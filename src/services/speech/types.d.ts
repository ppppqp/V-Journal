interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
        confidence: number;
      };
    };
  };
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  start(): void;
  stop(): void;
}

interface Window {
  webkitSpeechRecognition: {
    new(): SpeechRecognition;
  };
} 