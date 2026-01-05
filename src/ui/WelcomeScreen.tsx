import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../../supabaseClient';

// ------------------- TYPES -------------------
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string | null;
}

export interface InventoryItem {
  id: string;
  product_id: string;
  stock: number;
  low_stock_threshold: number;
  product: Product; // single Product object
}

interface ProductContextType {
  products: InventoryItem[];
  fetchProducts: () => Promise<void>;
  addProduct: (
    productId: string,
    initialStock: number,
    lowStockThreshold: number
  ) => Promise<void>;
  sendAlert: (machineId: string, type: string, message: string) => Promise<void>;
}

// ------------------- CONTEXT -------------------
export const ProductContext = createContext<ProductContextType | undefined>(
  undefined
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<InventoryItem[]>([]);

  // ------------------- FETCH PRODUCTS -------------------
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('inventory')
      .select(`
        id,
        product_id,
        stock,
        low_stock_threshold,
        product:products(id,name,price,image)
      `);

    if (error) {
      console.log('Fetch error:', error);
      return;
    }

    // Convert product array to single object
    const formatted: InventoryItem[] = (data ?? []).map((item: any) => ({
      ...item,
      product: (item.product && item.product[0]) || { id: '', name: '', price: 0, image: null },
    }));

    setProducts(formatted);
  };

  // ------------------- REAL-TIME SUBSCRIPTION -------------------
  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel('inventory-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'inventory' },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
       supabase.removeChannel(channel); // prevent promise error in useEffect
    };
  }, []);

  // ------------------- ADD PRODUCT -------------------
  const addProduct = async (
    productId: string,
    initialStock: number,
    lowStockThreshold: number
  ) => {
    const { error } = await supabase
      .from('inventory')
      .insert([
        { product_id: productId, stock: initialStock, low_stock_threshold: lowStockThreshold },
      ]);

    if (error) console.log('Add product error:', error);
    else fetchProducts();
  };

  // ------------------- SEND ALERT -------------------
  const sendAlert = async (machineId: string, type: string, message: string) => {
    const { error } = await supabase
      .from('alerts')
      .insert([{ machine_id: machineId, type, message }]);
    if (error) console.log('Alert error:', error);
  };

  // ------------------- PROVIDER -------------------
  return (
    <ProductContext.Provider value={{ products, fetchProducts, addProduct, sendAlert }}>
      {children}
    </ProductContext.Provider>
  );
};

// ------------------- CUSTOM HOOK -------------------
export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
