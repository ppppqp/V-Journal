export interface ConversationMessage {
  id: string;
  timestamp: number;
  type: 'user' | 'assistant';
  content: string;
}

export interface Conversation {
  id: string;
  date: string;
  messages: ConversationMessage[];
} 