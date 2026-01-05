import React from 'react';
import { 
  Package, 
  BarChart3, 
  RefreshCw, 
  FileText, 
  Activity, 
  AlertTriangle,
  PlusCircle 
} from 'lucide-react';
import type { Screen } from '../App';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  alertCount: number;
}

export function HomeScreen({ onNavigate, alertCount }: HomeScreenProps) {
  const menuItems = [
    {
      icon: PlusCircle,
      label: 'Add Product',
      screen: 'add-product' as Screen,
      color: 'bg-red-700',
      hoverColor: 'hover:bg-red-800',
    },
    {
      icon: BarChart3,
      label: 'Sales & Inventories',
      screen: 'sales-inventories' as Screen,
      color: 'bg-red-800',
      hoverColor: 'hover:bg-red-900',
    },
    {
      icon: RefreshCw,
      label: 'Restocking Info',
      screen: 'restocking-info' as Screen,
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
    },
    {
      icon: FileText,
      label: 'Transaction Logs',
      screen: 'transaction-logs' as Screen,
      color: 'bg-red-900',
      hoverColor: 'hover:bg-red-950',
    },
    {
      icon: Activity,
      label: 'Machine Status',
      screen: 'machine-status' as Screen,
      color: 'bg-red-700',
      hoverColor: 'hover:bg-red-800',
    },
    {
      icon: AlertTriangle,
      label: 'Alerts',
      screen: 'alerts' as Screen,
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      badge: alertCount > 0 ? alertCount : undefined,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-red-800 text-white p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Package className="w-8 h-8" />
          <h1>Vending Manager</h1>
        </div>
        <p className="text-red-100">Manage your school supplies vending machine</p>
      </div>

      {/* Menu Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item) => (
            <button
              key={item.screen}
              onClick={() => onNavigate(item.screen)}
              className={`${item.color} ${item.hoverColor} text-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 relative`}
            >
              <div className="flex flex-col items-center gap-3">
                <item.icon className="w-12 h-12" />
                <span className="text-center">{item.label}</span>
              </div>
              {item.badge && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-red-900 rounded-full w-7 h-7 flex items-center justify-center shadow-md">
                  {item.badge}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-md">
          <h2 className="mb-4 text-gray-700">Quick Overview</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-red-800 mb-1">0</div>
              <div className="text-gray-500">Products</div>
            </div>
            <div>
              <div className="text-red-700 mb-1">0</div>
              <div className="text-gray-500">In Stock</div>
            </div>
            <div>
              <div className="text-red-600 mb-1">0</div>
              <div className="text-gray-500">Low Stock</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}