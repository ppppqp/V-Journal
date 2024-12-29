export interface LLMResponse {
  text: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface LLMOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
}

export abstract class LLMAgent {
  abstract query(prompt: string, options?: LLMOptions): Promise<LLMResponse>;
  abstract streamQuery(
    prompt: string, 
    onToken: (token: string) => void,
    options?: LLMOptions
  ): Promise<void>;
} 