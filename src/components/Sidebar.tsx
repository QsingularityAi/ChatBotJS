import React, { useState } from 'react';
import { FileUpload } from './FileUpload';
import { Bot, Plus, Settings } from 'lucide-react';
import { ChatHistory } from './ChatHistory';
import { ModelSelector } from './ModelSelector';
import { APIKeySettings } from './APIKeySettings';
import { ChatSession, AIModel, APIKeys } from '../types';

interface SidebarProps {
  isOpen: boolean;
  currentFile: File | null;
  sessions: ChatSession[];
  currentSession: ChatSession;
  apiKeys: APIKeys;
  onFileUpload: (file: File) => void;
  onSessionSelect: (session: ChatSession) => void;
  onSessionDelete: (sessionId: string) => void;
  onNewChat: () => void;
  selectedModel: AIModel;
  onModelSelect: (model: AIModel) => void;
  onSaveAPIKeys: (keys: APIKeys) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  currentFile,
  sessions,
  currentSession,
  apiKeys,
  onFileUpload,
  onSessionSelect,
  onSessionDelete,
  onNewChat,
  selectedModel,
  onModelSelect,
  onSaveAPIKeys,
}) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <aside
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed lg:static inset-y-0 left-0 w-80 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out lg:translate-x-0
          z-30 flex flex-col
        `}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bot size={24} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">PDF Chat</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="API Settings"
              >
                <Settings size={20} className="text-gray-600" />
              </button>
              <button
                onClick={onNewChat}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="New Chat"
              >
                <Plus size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat History */}
        <ChatHistory
          sessions={sessions}
          currentSession={currentSession}
          onSessionSelect={onSessionSelect}
          onSessionDelete={onSessionDelete}
        />

        {/* File Upload Section */}
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Upload Document</h3>
          <FileUpload onFileUpload={onFileUpload} />
          
          {currentFile && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Current Document</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 break-all">{currentFile.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {(currentFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Model Selector */}
        <ModelSelector
          selectedModel={selectedModel}
          onModelSelect={onModelSelect}
        />
      </aside>

      {/* API Settings Modal */}
      {showSettings && (
        <APIKeySettings
          apiKeys={apiKeys}
          onSaveKeys={onSaveAPIKeys}
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  );
};