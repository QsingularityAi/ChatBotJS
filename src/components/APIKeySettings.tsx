import React, { useState } from 'react';
import { Settings, Eye, EyeOff, X } from 'lucide-react';
import { APIKeys } from '../types';

interface APIKeySettingsProps {
  apiKeys: APIKeys;
  onSaveKeys: (keys: APIKeys) => void;
  onClose: () => void;
}

export const APIKeySettings: React.FC<APIKeySettingsProps> = ({
  apiKeys,
  onSaveKeys,
  onClose,
}) => {
  const [keys, setKeys] = useState<APIKeys>(apiKeys);
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});

  const providers = [
    { id: 'openai', name: 'OpenAI' },
    { id: 'mistral', name: 'Mistral AI' },
    { id: 'google', name: 'Google AI' },
    { id: 'anthropic', name: 'Anthropic' },
    { id: 'groq', name: 'Groq' },
  ];

  const handleSave = () => {
    onSaveKeys(keys);
    onClose();
  };

  const toggleShowKey = (provider: string) => {
    setShowKeys(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Settings size={20} className="text-gray-600" />
            <h2 className="text-lg font-semibold">API Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {providers.map(({ id, name }) => (
            <div key={id} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {name} API Key
              </label>
              <div className="relative">
                <input
                  type={showKeys[id] ? 'text' : 'password'}
                  value={keys[id as keyof APIKeys] || ''}
                  onChange={(e) => setKeys(prev => ({
                    ...prev,
                    [id]: e.target.value
                  }))}
                  placeholder={`Enter your ${name} API key`}
                  className="w-full px-4 py-2 border rounded-lg pr-12
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => toggleShowKey(id)}
                  className="absolute right-2 top-1/2 -translate-y-1/2
                    p-2 text-gray-400 hover:text-gray-600"
                >
                  {showKeys[id] ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg
              hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};