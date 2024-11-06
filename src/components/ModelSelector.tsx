import React from 'react';
import { AIModel } from '../types';
import { AI_MODELS } from '../config/models';

interface ModelSelectorProps {
  selectedModel: AIModel;
  onModelSelect: (model: AIModel) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelSelect,
}) => {
  return (
    <div className="p-4 border-t border-gray-200">
      <h3 className="text-sm font-medium text-gray-700 mb-2">AI Model</h3>
      <div className="space-y-2">
        {AI_MODELS.map((model) => (
          <button
            key={model.id}
            onClick={() => onModelSelect(model)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors
              ${selectedModel.id === model.id
                ? 'bg-blue-50 text-blue-700'
                : 'hover:bg-gray-50 text-gray-700'
              }`}
          >
            <span className="text-xl">{model.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-medium">{model.name}</p>
              <p className="text-xs text-gray-500 capitalize">{model.provider}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};