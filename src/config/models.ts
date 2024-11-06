import { AIModel } from '../types';

export const AI_MODELS: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'openai',
    icon: '🤖'
  },
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'mistral',
    icon: '🌪️'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'google',
    icon: '🌟'
  },
  {
    id: 'claude-3',
    name: 'Claude 3',
    provider: 'anthropic',
    icon: '🎭'
  },
  {
    id: 'groq-mixtral',
    name: 'Mixtral',
    provider: 'groq',
    icon: '⚡'
  }
];