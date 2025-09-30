// src/context/ProductContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  date: string;
  image: string | null;
   threshold?: number;   // minimum stock before restocking alert

 
};


type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

 
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await AsyncStorage.getItem("products");
        if (data) {
          setProducts(JSON.parse(data));
        }
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };
    loadProducts();
  }, []);

  // Add product and persist
  const addProduct = (product: Product) => {
    setProducts((prev) => {
      const updated = [...prev, product];
      AsyncStorage.setItem("products", JSON.stringify(updated)).catch((err) =>
        console.error("Failed to save product", err)
      );
      return updated;
    });
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

// ✅ Custom hook for consuming context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used inside ProductProvider");
  }
  return context;
};
