export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  fileId?: string;
  fileName?: string;
  model: AIModel;
  timestamp: number;
}

export type AIModel = {
  id: string;
  name: string;
  provider: 'openai' | 'mistral' | 'google' | 'anthropic' | 'groq';
  icon: string;
};

export interface APIKeys {
  openai?: string;
  mistral?: string;
  google?: string;
  anthropic?: string;
  groq?: string;
}