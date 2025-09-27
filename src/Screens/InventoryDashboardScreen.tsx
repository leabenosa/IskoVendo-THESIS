import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useProducts } from "../context/ProductContext";

export default function InventoryDashboardScreen() {
  const { products } = useProducts();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventory Dashboard</Text>

      {products.length === 0 ? (
        <Text style={styles.emptyText}>No products in inventory. Add some!</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.card,
                item.quantity <= 5 && styles.lowStockCard, // 🔴 highlight low stock
              ]}
            >
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>
                Quantity:{" "}
                <Text
                  style={[
                    styles.quantity,
                    item.quantity <= 5 && styles.lowStockText,
                  ]}
                >
                  {item.quantity}
                </Text>
              </Text>
              <Text>Supplier: {item.supplier || "N/A"}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginTop: 50,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  lowStockCard: {
    borderWidth: 2,
    borderColor: "#e53935",
    backgroundColor: "#ffebee",
  },
  itemName: { fontSize: 18, fontWeight: "600" },
  quantity: { fontWeight: "bold" },
  lowStockText: { color: "#e53935" },
});
