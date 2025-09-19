import React from 'react';
import { FileSearch, Shield, TrendingUp } from 'lucide-react';
import { FileUpload } from './components/FileUpload';
import { AnalysisProgress } from './components/AnalysisProgress';
import { ReportViewer } from './components/ReportViewer';
import { UsageTracker } from './components/UsageTracker';
import { ExternalMonitor } from './components/ExternalMonitor';
import { useDocChecker } from './hooks/useDocChecker';

function App() {
  const {
    documents,
    isAnalyzing,
    currentReport,
    usageStats,
    uploadDocument,
    removeDocument,
    analyzeDocuments,
    clearAnalysis
  } = useDocChecker();

  const handleAnalyze = async () => {
    if (documents.length < 2) {
      alert('Please upload at least 2 documents for analysis');
      return;
    }
    await analyzeDocuments();
  };

  const handleNewUpdate = (update: any) => {
    // In a real implementation, this would trigger re-analysis
    console.log('External update received:', update);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                <FileSearch className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Smart Doc Checker</h1>
                <p className="text-sm text-gray-600">AI-Powered Document Analysis</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span>Real-time Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentReport ? (
          <ReportViewer report={currentReport} onNewAnalysis={clearAnalysis} />
        ) : (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center py-12">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Find Document Contradictions in Seconds
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Upload your organization's documents and let our AI identify conflicts, contradictions, 
                  and inconsistencies across policies, rules, and guidelines.
                </p>
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>99% Accuracy Rate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Real-time Processing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Detailed Reports</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <FileUpload
                  documents={documents}
                  onUpload={uploadDocument}
                  onRemove={removeDocument}
                />

                {isAnalyzing && (
                  <AnalysisProgress
                    isAnalyzing={isAnalyzing}
                    documentCount={documents.length}
                  />
                )}

                {documents.length >= 2 && !isAnalyzing && (
                  <div className="text-center">
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FileSearch className="h-5 w-5 mr-2" />
                      Analyze Documents for Contradictions
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-8">
                <UsageTracker stats={usageStats} />
                <ExternalMonitor onNewUpdate={handleNewUpdate} />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 Smart Doc Checker. Powered by advanced AI for document analysis and contradiction detection.</p>
            <p className="mt-2">Secure • Accurate • Fast</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;