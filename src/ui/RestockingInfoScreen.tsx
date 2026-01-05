import React from 'react';
import { ArrowLeft, AlertCircle, Package } from 'lucide-react';
import type { Product } from '../App';

interface RestockingInfoScreenProps {
  onBack: () => void;
  products: Product[];
}

export function RestockingInfoScreen({ onBack, products }: RestockingInfoScreenProps) {
  const LOW_STOCK_THRESHOLD = 10;
  const CRITICAL_STOCK_THRESHOLD = 5;

  const lowStockProducts = products.filter(p => p.quantity <= LOW_STOCK_THRESHOLD);
  const criticalStockProducts = products.filter(p => p.quantity <= CRITICAL_STOCK_THRESHOLD);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-800 text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="hover:bg-red-900 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1>Restocking Info</h1>
            <p className="text-red-100">Items that need replenishment</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-900">Critical</span>
            </div>
            <div className="text-red-600">{criticalStockProducts.length} items</div>
            <div className="text-red-700">≤ 5 units</div>
          </div>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-orange-600" />
              <span className="text-orange-900">Low Stock</span>
            </div>
            <div className="text-orange-600">{lowStockProducts.length} items</div>
            <div className="text-orange-700">≤ 10 units</div>
          </div>
        </div>

        {/* Critical Stock Items */}
        {criticalStockProducts.length > 0 && (
          <div className="mb-6 bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="bg-red-100 px-6 py-4 border-b border-red-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h2 className="text-red-900">Critical - Immediate Action Required</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {criticalStockProducts.map(product => {
                const recommendedRestock = 50 - product.quantity;
                return (
                  <div key={product.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-gray-900 mb-1">{product.name}</div>
                        <div className="text-gray-500">₱{product.price.toFixed(2)} per unit</div>
                      </div>
                      <div className="text-right">
                        <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full inline-block mb-1">
                          {product.quantity} left
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                      <div className="text-blue-900 mb-1">Recommended Restock</div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">{recommendedRestock} units</span>
                        <span className="text-blue-600">
                          Cost: ₱{(recommendedRestock * product.price).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Low Stock Items */}
        {lowStockProducts.filter(p => p.quantity > CRITICAL_STOCK_THRESHOLD).length > 0 && (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="bg-orange-100 px-6 py-4 border-b border-orange-200">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-orange-600" />
                <h2 className="text-orange-900">Low Stock - Plan Restocking Soon</h2>
              </div>
            </div>
            <div className="divide-y divide-gray-200">
              {lowStockProducts
                .filter(p => p.quantity > CRITICAL_STOCK_THRESHOLD)
                .map(product => {
                  const recommendedRestock = 50 - product.quantity;
                  return (
                    <div key={product.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-gray-900 mb-1">{product.name}</div>
                          <div className="text-gray-500">₱{product.price.toFixed(2)} per unit</div>
                        </div>
                        <div className="text-right">
                          <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full inline-block mb-1">
                            {product.quantity} left
                          </div>
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                        <div className="text-blue-900 mb-1">Recommended Restock</div>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-700">{recommendedRestock} units</span>
                          <span className="text-blue-600">
                            Cost: ₱{(recommendedRestock * product.price).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* All Good Message */}
        {lowStockProducts.length === 0 && (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
            <Package className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-green-900 mb-2">All Stock Levels Good!</h2>
            <p className="text-green-700">No items need restocking at this time.</p>
          </div>
        )}

        {/* Summary */}
        {lowStockProducts.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-md">
            <h2 className="mb-4 text-gray-700">Restocking Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Items to restock:</span>
                <span className="text-gray-900">{lowStockProducts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated cost:</span>
                <span className="text-gray-900">
                  ₱{lowStockProducts.reduce((sum, p) => {
                    const restock = 50 - p.quantity;
                    return sum + (restock * p.price);
                  }, 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}