import React from 'react';
import { Brain, FileSearch, AlertTriangle } from 'lucide-react';

interface AnalysisProgressProps {
  isAnalyzing: boolean;
  documentCount: number;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({
  isAnalyzing,
  documentCount
}) => {
  if (!isAnalyzing) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
      <div className="flex items-center justify-center space-x-4 mb-6">
        <div className="relative">
          <Brain className="h-8 w-8 text-blue-600 animate-pulse" />
          <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-ping"></div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            AI Analysis in Progress
          </h3>
          <p className="text-gray-600">
            Scanning {documentCount} documents for contradictions...
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-md">
          <FileSearch className="h-5 w-5 text-blue-600" />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 mb-1">
              Document Processing
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-white/60 rounded-md">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 mb-1">
              Contradiction Detection
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-amber-600 h-2 rounded-full animate-pulse" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-4">
          This may take a few moments. AI is analyzing content, context, and cross-references...
        </div>
      </div>
    </div>
  );
};