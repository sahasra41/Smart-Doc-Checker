import React, { useState, useEffect } from 'react';
import { ExternalUpdate } from '../types';
import { Globe, Bell, Clock, ArrowRight } from 'lucide-react';

interface ExternalMonitorProps {
  onNewUpdate: (update: ExternalUpdate) => void;
}

export const ExternalMonitor: React.FC<ExternalMonitorProps> = ({ onNewUpdate }) => {
  const [updates, setUpdates] = useState<ExternalUpdate[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);

  useEffect(() => {
    // Simulate external updates every 30 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of update
        const mockUpdate: ExternalUpdate = {
          id: Math.random().toString(36).substr(2, 9),
          source: 'College Policy Portal',
          title: 'Updated Academic Calendar Guidelines',
          updateDate: new Date(),
          changes: [
            'Exam schedule moved from June 15 to June 20',
            'Assignment submission deadline extended to 11:59 PM',
            'Minimum attendance requirement changed to 70%'
          ],
          impactedPolicies: ['Academic Calendar', 'Attendance Policy', 'Examination Rules']
        };

        setUpdates(prev => [mockUpdate, ...prev.slice(0, 4)]);
        onNewUpdate(mockUpdate);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [onNewUpdate]);

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
    if (!isMonitoring) {
      // Simulate immediate update when starting monitoring
      setTimeout(() => {
        const mockUpdate: ExternalUpdate = {
          id: Math.random().toString(36).substr(2, 9),
          source: 'HR Policy Center',
          title: 'Leave Policy Updates',
          updateDate: new Date(),
          changes: [
            'Sick leave can now be taken with 24-hour notice',
            'Maximum consecutive vacation days increased to 15',
            'Maternity leave extended to 6 months'
          ],
          impactedPolicies: ['Leave Management', 'HR Policies', 'Employee Benefits']
        };
        setUpdates(prev => [mockUpdate, ...prev]);
        onNewUpdate(mockUpdate);
      }, 2000);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">External Document Monitor</h3>
              <p className="text-sm text-gray-600">Track policy updates from external sources</p>
            </div>
          </div>
          <button
            onClick={toggleMonitoring}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isMonitoring
                ? 'text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500'
                : 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500'
            }`}
          >
            {isMonitoring ? (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                Stop Monitoring
              </>
            ) : (
              <>
                <Bell className="h-4 w-4 mr-2" />
                Start Monitoring
              </>
            )}
          </button>
        </div>
      </div>

      <div className="p-6">
        {updates.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Globe className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p>No external updates detected yet</p>
            <p className="text-sm mt-1">Enable monitoring to track policy changes</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Recent Updates ({updates.length})
            </h4>
            {updates.map((update) => (
              <div
                key={update.id}
                className="border border-amber-200 rounded-lg p-4 bg-amber-50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h5 className="font-semibold text-gray-900">{update.title}</h5>
                    <p className="text-sm text-gray-600">{update.source} • {update.updateDate.toLocaleString()}</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    New Update
                  </span>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Changes Detected:</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {update.changes.map((change, idx) => (
                        <li key={idx} className="flex items-start">
                          <ArrowRight className="h-3 w-3 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">Impacted Policies:</p>
                    <div className="flex flex-wrap gap-1">
                      {update.impactedPolicies.map((policy, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {policy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-amber-200">
                  <button className="text-sm text-amber-700 hover:text-amber-900 font-medium">
                    Re-analyze documents for new conflicts →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};