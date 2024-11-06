import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  isBot: boolean;
  content: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ isBot, content }) => {
  return (
    <div className={`flex items-start gap-4 max-w-4xl mx-auto ${isBot ? 'bg-white' : 'bg-blue-50'} p-6 rounded-xl shadow-sm`}>
      <div className={`p-2 rounded-full flex-shrink-0 ${isBot ? 'bg-blue-100' : 'bg-purple-100'}`}>
        {isBot ? <Bot size={24} className="text-blue-600" /> : <User size={24} className="text-purple-600" />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
          {content}
        </p>
      </div>
    </div>
  );
};