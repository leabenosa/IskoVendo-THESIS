import React from 'react';
import { ArrowLeft, AlertTriangle, Wrench, Package, CheckCircle, Clock } from 'lucide-react';
import type { Alert } from '../App';

interface AlertScreenProps {
  onBack: () => void;
  alerts: Alert[];
  onResolveAlert: (alertId: string) => void;
}

export function AlertScreen({ onBack, alerts, onResolveAlert }: AlertScreenProps) {
  const activeAlerts = alerts.filter(a => !a.resolved);
  const resolvedAlerts = alerts.filter(a => a.resolved);

  const getAlertConfig = (type: Alert['type']) => {
    switch (type) {
      case 'jam':
        return {
          icon: AlertTriangle,
          color: 'red',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-900',
          iconColor: 'text-red-600',
          iconBg: 'bg-red-100',
          label: 'Product Jam',
        };
      case 'maintenance':
        return {
          icon: Wrench,
          color: 'orange',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-900',
          iconColor: 'text-orange-600',
          iconBg: 'bg-orange-100',
          label: 'Maintenance Required',
        };
      case 'low-stock':
        return {
          icon: Package,
          color: 'yellow',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-900',
          iconColor: 'text-yellow-600',
          iconBg: 'bg-yellow-100',
          label: 'Low Stock',
        };
    }
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-900 text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="hover:bg-red-950 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1>Alerts & Notifications</h1>
            <p className="text-red-100">{activeAlerts.length} active alert{activeAlerts.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Alert Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
            <div className="text-red-600 mb-1">
              {activeAlerts.filter(a => a.type === 'jam').length}
            </div>
            <div className="text-red-900">Jams</div>
          </div>
          <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 text-center">
            <div className="text-orange-600 mb-1">
              {activeAlerts.filter(a => a.type === 'maintenance').length}
            </div>
            <div className="text-orange-900">Maintenance</div>
          </div>
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 text-center">
            <div className="text-yellow-600 mb-1">
              {activeAlerts.filter(a => a.type === 'low-stock').length}
            </div>
            <div className="text-yellow-900">Low Stock</div>
          </div>
        </div>

        {/* Active Alerts */}
        {activeAlerts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-gray-700 mb-4">Active Alerts</h2>
            <div className="space-y-3">
              {activeAlerts.map(alert => {
                const config = getAlertConfig(alert.type);
                const AlertIcon = config.icon;
                
                return (
                  <div 
                    key={alert.id} 
                    className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 border-${config.color}-500`}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`${config.iconBg} p-2 rounded-lg flex-shrink-0`}>
                          <AlertIcon className={`w-5 h-5 ${config.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`${config.textColor} mb-1`}>
                            {config.label}
                          </div>
                          <div className="text-gray-900 mb-2">{alert.message}</div>
                          <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{formatDate(alert.timestamp)}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onResolveAlert(alert.id)}
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark as Resolved
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* No Active Alerts */}
        {activeAlerts.length === 0 && (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-green-900 mb-2">All Clear!</h2>
            <p className="text-green-700">No active alerts at this time.</p>
          </div>
        )}

        {/* Resolved Alerts */}
        {resolvedAlerts.length > 0 && (
          <div>
            <h2 className="text-gray-700 mb-4">Recently Resolved</h2>
            <div className="space-y-3">
              {resolvedAlerts.map(alert => {
                const config = getAlertConfig(alert.type);
                const AlertIcon = config.icon;
                
                return (
                  <div 
                    key={alert.id} 
                    className="bg-white rounded-xl shadow-sm p-4 opacity-60"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-gray-100 p-2 rounded-lg flex-shrink-0">
                        <AlertIcon className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-gray-600 mb-1">{config.label}</div>
                        <div className="text-gray-700 mb-2">{alert.message}</div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>Resolved</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Alert Guidelines */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-gray-700 mb-4">Alert Response Guide</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="bg-red-100 p-2 rounded-lg h-fit">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-gray-900 mb-1">Product Jam</div>
                <p className="text-gray-600">Check the dispensing mechanism and remove any stuck items. Test the slot before marking as resolved.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-orange-100 p-2 rounded-lg h-fit">
                <Wrench className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-gray-900 mb-1">Maintenance Required</div>
                <p className="text-gray-600">Perform scheduled maintenance or contact technical support for repairs.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg h-fit">
                <Package className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-gray-900 mb-1">Low Stock</div>
                <p className="text-gray-600">Restock items as soon as possible to prevent out-of-stock situations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}