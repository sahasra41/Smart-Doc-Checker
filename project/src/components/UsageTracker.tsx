import React from 'react';
import { UsageStats } from '../types';
import { BarChart3, FileText, AlertTriangle, DollarSign } from 'lucide-react';

interface UsageTrackerProps {
  stats: UsageStats;
}

export const UsageTracker: React.FC<UsageTrackerProps> = ({ stats }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Usage & Billing</h3>
        <BarChart3 className="h-6 w-6 text-gray-400" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <FileText className="mx-auto h-8 w-8 text-blue-600 mb-2" />
          <div className="text-2xl font-bold text-blue-900">{stats.documentsAnalyzed}</div>
          <div className="text-sm text-blue-700">Documents Analyzed</div>
          <div className="text-xs text-blue-600 mt-1">$5 per document</div>
        </div>

        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <BarChart3 className="mx-auto h-8 w-8 text-green-600 mb-2" />
          <div className="text-2xl font-bold text-green-900">{stats.reportsGenerated}</div>
          <div className="text-sm text-green-700">Reports Generated</div>
          <div className="text-xs text-green-600 mt-1">$15 per report</div>
        </div>

        <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200">
          <AlertTriangle className="mx-auto h-8 w-8 text-amber-600 mb-2" />
          <div className="text-2xl font-bold text-amber-900">{stats.contradictionsFound}</div>
          <div className="text-sm text-amber-700">Issues Detected</div>
          <div className="text-xs text-amber-600 mt-1">Total conflicts</div>
        </div>

        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
          <DollarSign className="mx-auto h-8 w-8 text-purple-600 mb-2" />
          <div className="text-2xl font-bold text-purple-900">${stats.totalBilling}</div>
          <div className="text-sm text-purple-700">Total Billing</div>
          <div className="text-xs text-purple-600 mt-1">Cumulative cost</div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Documents ({stats.documentsAnalyzed} × $5):</span>
            <span>${stats.documentsAnalyzed * 5}</span>
          </div>
          <div className="flex justify-between">
            <span>Reports ({stats.reportsGenerated} × $15):</span>
            <span>${stats.reportsGenerated * 15}</span>
          </div>
          <div className="flex justify-between font-medium text-gray-900 pt-1 border-t">
            <span>Total Billing:</span>
            <span>${stats.totalBilling}</span>
          </div>
        </div>
      </div>
    </div>
  );
};