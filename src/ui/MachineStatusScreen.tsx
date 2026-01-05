import React from 'react';
import { ArrowLeft, Wifi, WifiOff, Wrench, Activity, Thermometer, Zap, HardDrive } from 'lucide-react';

interface MachineStatusScreenProps {
  onBack: () => void;
  status: 'online' | 'offline' | 'maintenance';
  onStatusChange: (status: 'online' | 'offline' | 'maintenance') => void;
}

export function MachineStatusScreen({ onBack, status, onStatusChange }: MachineStatusScreenProps) {
  const statusConfig = {
    online: {
      color: 'green',
      bgColor: 'bg-green-500',
      textColor: 'text-green-600',
      icon: Wifi,
      label: 'Online',
      description: 'Machine is operational and accepting transactions',
    },
    offline: {
      color: 'red',
      bgColor: 'bg-red-800',
      textColor: 'text-red-800',
      icon: WifiOff,
      label: 'Offline',
      description: 'Machine is not accepting transactions',
    },
    maintenance: {
      color: 'orange',
      bgColor: 'bg-red-700',
      textColor: 'text-red-700',
      icon: Wrench,
      label: 'Maintenance',
      description: 'Machine is under maintenance',
    },
  };

  const currentStatus = statusConfig[status];
  const StatusIcon = currentStatus.icon;

  // Mock system metrics
  const systemMetrics = [
    {
      icon: Thermometer,
      label: 'Temperature',
      value: '24°C',
      status: 'normal',
      color: 'text-red-800',
      bgColor: 'bg-red-50',
    },
    {
      icon: Zap,
      label: 'Power',
      value: '98%',
      status: 'normal',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: HardDrive,
      label: 'Storage',
      value: '45% Used',
      status: 'normal',
      color: 'text-red-900',
      bgColor: 'bg-red-50',
    },
    {
      icon: Activity,
      label: 'Uptime',
      value: '14 days',
      status: 'normal',
      color: 'text-red-700',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className={`${currentStatus.bgColor} text-white p-4 shadow-md`}>
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="hover:bg-white/20 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1>Machine Status</h1>
            <p className="text-white/90">Monitor your vending machine</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Current Status */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-700">Current Status</h2>
            <div className={`${currentStatus.bgColor} p-3 rounded-full`}>
              <StatusIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className={`${currentStatus.textColor} mb-2`}>
            {currentStatus.label}
          </div>
          <p className="text-gray-600">{currentStatus.description}</p>

          {/* Status Indicator */}
          <div className="mt-4 flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${currentStatus.bgColor} animate-pulse`}></div>
            <span className="text-gray-600">
              Last updated: {new Date().toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* Change Status */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-gray-700 mb-4">Change Status</h2>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => onStatusChange('online')}
              className={`p-4 rounded-xl border-2 transition-all ${
                status === 'online'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-green-300'
              }`}
            >
              <Wifi className={`w-6 h-6 mx-auto mb-2 ${
                status === 'online' ? 'text-green-600' : 'text-gray-400'
              }`} />
              <div className={status === 'online' ? 'text-green-600' : 'text-gray-600'}>
                Online
              </div>
            </button>

            <button
              onClick={() => onStatusChange('offline')}
              className={`p-4 rounded-xl border-2 transition-all ${
                status === 'offline'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-red-300'
              }`}
            >
              <WifiOff className={`w-6 h-6 mx-auto mb-2 ${
                status === 'offline' ? 'text-red-600' : 'text-gray-400'
              }`} />
              <div className={status === 'offline' ? 'text-red-600' : 'text-gray-600'}>
                Offline
              </div>
            </button>

            <button
              onClick={() => onStatusChange('maintenance')}
              className={`p-4 rounded-xl border-2 transition-all ${
                status === 'maintenance'
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-orange-300'
              }`}
            >
              <Wrench className={`w-6 h-6 mx-auto mb-2 ${
                status === 'maintenance' ? 'text-orange-600' : 'text-gray-400'
              }`} />
              <div className={status === 'maintenance' ? 'text-orange-600' : 'text-gray-600'}>
                Maintenance
              </div>
            </button>
          </div>
        </div>

        {/* System Metrics */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-gray-700 mb-4">System Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            {systemMetrics.map((metric, index) => (
              <div key={index} className={`${metric.bgColor} rounded-xl p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  <span className="text-gray-700">{metric.label}</span>
                </div>
                <div className={metric.color}>{metric.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Machine Info */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-gray-700 mb-4">Machine Information</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Model</span>
              <span className="text-gray-900">SmartVend Pro 3000</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Serial Number</span>
              <span className="text-gray-900">SV-2024-1234</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Location</span>
              <span className="text-gray-900">Main Campus Building A</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Last Maintenance</span>
              <span className="text-gray-900">Dec 15, 2025</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Firmware Version</span>
              <span className="text-gray-900">v2.1.5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}