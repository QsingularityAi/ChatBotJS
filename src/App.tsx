import React, { useState, useRef } from 'react';
import { Send, Loader2, MenuIcon } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { Sidebar } from './components/Sidebar';
import { Message, ChatSession, AIModel, APIKeys } from './types';
import { AI_MODELS } from './config/models';

function App() {
  // Initialize with a default session
  const defaultSession: ChatSession = {
    id: 'default',
    title: 'New Chat',
    messages: [{
      id: 'welcome',
      content: "Hello! Upload a PDF document and I'll help answer your questions about it.",
      isBot: true,
      timestamp: Date.now()
    }],
    model: AI_MODELS[0],
    timestamp: Date.now()
  };

  const [sessions, setSessions] = useState<ChatSession[]>([defaultSession]);
  const [currentSession, setCurrentSession] = useState<ChatSession>(defaultSession);
  const [loading, setLoading] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [input, setInput] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [apiKeys, setApiKeys] = useState<APIKeys>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileUpload = (file: File) => {
    setCurrentFile(file);
    const newMessage: Message = {
      id: Date.now().toString(),
      content: `PDF "${file.name}" uploaded successfully! What would you like to know about it?`,
      isBot: true,
      timestamp: Date.now()
    };
    
    updateSession(currentSession.id, {
      ...currentSession,
      messages: [...currentSession.messages, newMessage],
      fileId: file.name,
      fileName: file.name
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      isBot: false,
      timestamp: Date.now()
    };

    setInput('');
    updateSession(currentSession.id, {
      ...currentSession,
      messages: [...currentSession.messages, userMessage]
    });
    setLoading(true);

    // Check if API key is available for the selected model
    const modelProvider = currentSession.model.provider;
    if (!apiKeys[modelProvider]) {
      const botMessage: Message = {
        id: Date.now().toString(),
        content: `Please set up your ${modelProvider} API key in the settings first.`,
        isBot: true,
        timestamp: Date.now()
      };

      updateSession(currentSession.id, {
        ...currentSession,
        messages: [...currentSession.messages, userMessage, botMessage]
      });
      setLoading(false);
      return;
    }

    // Simulate API response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `[${currentSession.model.name}] I understand your question. In the actual implementation, this would be processed through ${currentSession.model.provider}'s API using the provided API key.`,
        isBot: true,
        timestamp: Date.now()
      };

      updateSession(currentSession.id, {
        ...currentSession,
        messages: [...currentSession.messages, userMessage, botMessage]
      });
      setLoading(false);
    }, 1000);
  };

  const updateSession = (sessionId: string, updatedSession: ChatSession) => {
    setSessions(prev => prev.map(session => 
      session.id === sessionId ? updatedSession : session
    ));
    if (currentSession.id === sessionId) {
      setCurrentSession(updatedSession);
    }
  };

  const handleNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [{
        id: 'welcome',
        content: "Hello! Upload a PDF document and I'll help answer your questions about it.",
        isBot: true,
        timestamp: Date.now()
      }],
      model: currentSession.model,
      timestamp: Date.now()
    };
    setSessions(prev => [...prev, newSession]);
    setCurrentSession(newSession);
    setCurrentFile(null);
  };

  const handleSessionSelect = (session: ChatSession) => {
    setCurrentSession(session);
    setCurrentFile(session.fileName ? new File([], session.fileName) : null);
  };

  const handleSessionDelete = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    if (currentSession.id === sessionId) {
      handleNewChat();
    }
  };

  const handleModelSelect = (model: AIModel) => {
    const updatedSession = { ...currentSession, model };
    updateSession(currentSession.id, updatedSession);
  };

  const handleSaveAPIKeys = (keys: APIKeys) => {
    setApiKeys(keys);
  };

  React.useEffect(scrollToBottom, [currentSession.messages]);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        currentFile={currentFile}
        sessions={sessions}
        currentSession={currentSession}
        apiKeys={apiKeys}
        onFileUpload={handleFileUpload}
        onSessionSelect={handleSessionSelect}
        onSessionDelete={handleSessionDelete}
        onNewChat={handleNewChat}
        selectedModel={currentSession.model}
        onModelSelect={handleModelSelect}
        onSaveAPIKeys={handleSaveAPIKeys}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg lg:hidden"
            >
              <MenuIcon size={20} />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-800">{currentSession.title}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{currentSession.model.icon}</span>
                <span>{currentSession.model.name}</span>
              </div>
            </div>
          </div>
          {currentFile && (
            <div className="text-sm text-gray-600">
              Current: {currentFile.name}
            </div>
          )}
        </header>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {currentSession.messages.map((message) => (
            <ChatMessage key={message.id} {...message} />
          ))}
          {loading && (
            <div className="flex items-center justify-center p-4">
              <Loader2 className="animate-spin text-blue-500" />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="border-t border-gray-200 bg-white p-4">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your PDF..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!currentFile || loading}
            />
            <button
              type="submit"
              disabled={!currentFile || !input.trim() || loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
            >
              <Send size={20} />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;