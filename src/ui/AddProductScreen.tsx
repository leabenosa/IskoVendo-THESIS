import React, { useState } from 'react';
import { ArrowLeft, PlusCircle, Package } from 'lucide-react';
import type { Product } from '../App';

interface AddProductScreenProps {
  onBack: () => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  products: Product[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export function AddProductScreen({ onBack, onAddProduct, products, onUpdateQuantity }: AddProductScreenProps) {
  const [mode, setMode] = useState<'new' | 'restock'>('new');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'new') {
      if (!productName || !price || !quantity) return;
      
      onAddProduct({
        name: productName,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      });
      
      setProductName('');
      setPrice('');
      setQuantity('');
    } else {
      if (!selectedProductId || !quantity) return;
      
      onUpdateQuantity(selectedProductId, parseInt(quantity));
      setSelectedProductId('');
      setQuantity('');
    }
  };

  const selectedProduct = products.find(p => p.id === selectedProductId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-800 text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="hover:bg-red-900 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1>Add Product</h1>
            <p className="text-red-100">Add new or restock existing items</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Mode Toggle */}
        <div className="flex gap-2 mb-6 bg-gray-200 p-1 rounded-lg">
          <button
            onClick={() => setMode('new')}
            className={`flex-1 py-2 rounded-md transition-colors ${
              mode === 'new' ? 'bg-white shadow-sm text-red-800' : 'text-gray-600'
            }`}
          >
            New Product
          </button>
          <button
            onClick={() => setMode('restock')}
            className={`flex-1 py-2 rounded-md transition-colors ${
              mode === 'restock' ? 'bg-white shadow-sm text-red-800' : 'text-gray-600'
            }`}
          >
            Restock
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-md">
          {mode === 'new' ? (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="e.g., Ballpen (Black)"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Price (₱)</label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Quantity to Add</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="0"
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Select Product</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                  required
                >
                  <option value="">Choose a product...</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedProduct && (
                <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-red-800" />
                    <span className="text-gray-700">Current Inventory</span>
                  </div>
                  <div className="text-red-800">{selectedProduct.quantity} units</div>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Quantity to Add</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                  placeholder="0"
                  required
                />
              </div>

              {selectedProduct && quantity && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-gray-700 mb-1">New Inventory Count</div>
                  <div className="text-green-600">
                    {selectedProduct.quantity + parseInt(quantity || '0')} units
                  </div>
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            className="w-full bg-red-800 text-white py-3 rounded-lg hover:bg-red-900 transition-colors flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            {mode === 'new' ? 'Add Product' : 'Update Inventory'}
          </button>
        </form>

        {/* Current Inventory */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-md">
          <h2 className="mb-4 text-gray-700">Current Inventory</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {products.map(product => (
              <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-gray-900">{product.name}</div>
                  <div className="text-gray-500">₱{product.price.toFixed(2)}</div>
                </div>
                <div className={`px-3 py-1 rounded-full ${
                  product.quantity < 10 ? 'bg-red-100 text-red-700' : 
                  product.quantity < 20 ? 'bg-orange-100 text-orange-700' : 
                  'bg-green-100 text-green-700'
                }`}>
                  {product.quantity} units
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}