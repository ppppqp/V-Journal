import OpenAI from 'openai';
import { LLMAgent, LLMResponse, LLMOptions } from './LLMAgent';

export class OpenAIAgent extends LLMAgent {
  private client: OpenAI;

  constructor(apiKey: string) {
    super();
    this.client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
  }

  async query(prompt: string, options: LLMOptions = {}): Promise<LLMResponse> {
    const completion = await this.client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: options.model || 'gpt-3.5-turbo',
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens,
    });

    return {
      text: completion.choices[0].message.content || '',
      usage: {
        promptTokens: completion.usage?.prompt_tokens || 0,
        completionTokens: completion.usage?.completion_tokens || 0,
        totalTokens: completion.usage?.total_tokens || 0,
      },
    };
  }

  async streamQuery(
    prompt: string,
    onToken: (token: string) => void,
    options: LLMOptions = {}
  ): Promise<void> {
    const stream = await this.client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: options.model || 'gpt-3.5-turbo',
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens,
      stream: true,
    });

    for await (const chunk of stream) {
      const token = chunk.choices[0]?.delta?.content || '';
      if (token) onToken(token);
    }
  }
} 