import React from 'react';
import { ChatSession } from '../types';
import { MessageSquare, Trash2 } from 'lucide-react';

interface ChatHistoryProps {
  sessions: ChatSession[];
  currentSession: ChatSession;
  onSessionSelect: (session: ChatSession) => void;
  onSessionDelete: (sessionId: string) => void;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({
  sessions,
  currentSession,
  onSessionSelect,
  onSessionDelete,
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Chat History</h3>
      <div className="space-y-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
              ${session.id === currentSession.id
                ? 'bg-blue-50 text-blue-700'
                : 'hover:bg-gray-50 text-gray-700'
              }`}
            onClick={() => onSessionSelect(session)}
          >
            <MessageSquare size={18} className="flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{session.title}</p>
              <p className="text-xs text-gray-500">
                {new Date(session.timestamp).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSessionDelete(session.id);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
            >
              <Trash2 size={16} className="text-gray-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};