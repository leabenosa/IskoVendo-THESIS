import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { supabase } from '../../supabaseClient';
import { useProducts, InventoryItem } from './ProductContext'; // ✅ use InventoryItem

export default function InventoryDashboardScreen() {
  const { products: initialProducts } = useProducts(); 
  const [products, setProducts] = useState<InventoryItem[]>(initialProducts);

  // Update local state whenever context changes
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // Real-time updates from Supabase
  useEffect(() => {
    const channel = supabase
      .channel('inventory-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'inventory' },
        (payload) => {
          console.log('Inventory updated:', payload.new);

          const updatedItem = payload.new as InventoryItem;

          setProducts(prevProducts => {
            const index = prevProducts.findIndex(p => p.id === updatedItem.id);
            if (index > -1) {
              // Update existing inventory item
              const updated = [...prevProducts];
              updated[index] = { ...updated[index], ...updatedItem };
              return updated;
            } else {
              // Add new inventory item
              return [...prevProducts, updatedItem];
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
              {item.product?.image ? (
                <Image source={{ uri: item.product.image }} style={styles.image} />
              ) : (
                <View style={[styles.image, styles.noImage]}>
                  <Text>No Image</Text>
                </View>
              )}
              <View style={styles.info}>
                <Text style={styles.name}>{item.product?.name}</Text>
                <Text>Qty: {item.stock}</Text>
                <Text>Price: ₱{item.product?.price || 0}</Text>
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
