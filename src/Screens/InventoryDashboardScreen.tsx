import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { useProducts } from "../context/ProductContext";
import { supabase } from '../../supabaseClient';

// Define Product type
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
  [key: string]: any; // allow extra fields from Supabase
}

export default function InventoryDashboardScreen() {
  const { products: initialProducts } = useProducts(); 
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Real-time updates from Supabase
  useEffect(() => {
    const channel = supabase
      .channel('inventory-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'inventory' },
        (payload) => {
          console.log('Inventory updated:', payload.new);

          // Cast payload.new to Product
          const updatedProduct = payload.new as Product;

          // Update local state
          setProducts(prevProducts => {
            const index = prevProducts.findIndex(p => p.id === updatedProduct.id);
            if (index > -1) {
              // Update existing product
              const updated = [...prevProducts];
              updated[index] = { ...updated[index], ...updatedProduct };
              return updated;
            } else {
              // Add new product
              return [...prevProducts, updatedProduct];
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Inventory Dashboard</Text>

      {products.length === 0 ? (
        <Text style={styles.empty}>No products yet. Add one!</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.image} />
              ) : (
                <View style={[styles.image, styles.noImage]}>
                  <Text>No Image</Text>
                </View>
              )}
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>Qty: {item.quantity}</Text>
                <Text>Price: ₱{item.price || "0"}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  empty: { fontSize: 16, color: "#777" },
  card: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fafafa",
  },
  image: { width: 60, height: 60, borderRadius: 8 },
  noImage: { justifyContent: "center", alignItems: "center", backgroundColor: "#eee" },
  info: { marginLeft: 10 },
  name: { fontSize: 18, fontWeight: "600" },
});
