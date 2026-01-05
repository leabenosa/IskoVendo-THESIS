import React from 'react';
import { ArrowLeft, TrendingUp, Package } from 'lucide-react';
import type { Product, Transaction } from '../App';

interface SalesInventoriesScreenProps {
  onBack: () => void;
  products: Product[];
  transactions: Transaction[];
}

export function SalesInventoriesScreen({ onBack, products, transactions }: SalesInventoriesScreenProps) {
  // Calculate total sales for the month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlySales = transactions
    .filter(t => 
      t.status === 'success' && 
      t.timestamp.getMonth() === currentMonth && 
      t.timestamp.getFullYear() === currentYear
    )
    .reduce((sum, t) => sum + t.total, 0);

  const totalInventoryValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-800 text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="hover:bg-red-900 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1>Sales & Inventories</h1>
            <p className="text-red-100">Track your performance</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Sales Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-red-700 to-red-800 text-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span>Monthly Sales</span>
            </div>
            <div className="text-white/90">January 2026</div>
            <div className="mt-2">₱{monthlySales.toFixed(2)}</div>
          </div>

          <div className="bg-gradient-to-br from-red-900 to-red-950 text-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5" />
              <span>Inventory Value</span>
            </div>
            <div className="text-white/90">Total Worth</div>
            <div className="mt-2">₱{totalInventoryValue.toFixed(2)}</div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
            <h2 className="text-gray-700">Product Inventory</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-600">Product</th>
                  <th className="px-4 py-3 text-right text-gray-600">Price</th>
                  <th className="px-4 py-3 text-right text-gray-600">Stock</th>
                  <th className="px-4 py-3 text-right text-gray-600">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map(product => {
                  const value = product.price * product.quantity;
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-600">
                        ₱{product.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`inline-block px-2 py-1 rounded-full ${
                          product.quantity < 10 ? 'bg-red-100 text-red-700' : 
                          product.quantity < 20 ? 'bg-orange-100 text-orange-700' : 
                          'bg-green-100 text-green-700'
                        }`}>
                          {product.quantity}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-gray-900">
                        ₱{value.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                <tr>
                  <td className="px-4 py-3 text-gray-900" colSpan={3}>Total Value</td>
                  <td className="px-4 py-3 text-right text-gray-900">
                    ₱{totalInventoryValue.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Sales Stats */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-md">
          <h2 className="mb-4 text-gray-700">This Month's Activity</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-red-700 mb-1">
                {transactions.filter(t => t.status === 'success').length}
              </div>
              <div className="text-gray-500">Successful</div>
            </div>
            <div>
              <div className="text-red-600 mb-1">
                {transactions.filter(t => t.status === 'failed').length}
              </div>
              <div className="text-gray-500">Failed</div>
            </div>
            <div>
              <div className="text-red-800 mb-1">
                {transactions.length}
              </div>
              <div className="text-gray-500">Total Trans.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}