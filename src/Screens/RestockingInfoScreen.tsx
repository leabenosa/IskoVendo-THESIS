import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

// Example inventory data (you can fetch this from context, API, or props)
const inventoryData = [
  { id: "1", name: "Pencils", quantity: 5, threshold: 10, lastRestock: "2025-09-20", staff: "Staff #2" },
  { id: "2", name: "Notebooks", quantity: 20, threshold: 15, lastRestock: "2025-09-22", staff: "Staff #3" },
  { id: "3", name: "Erasers", quantity: 3, threshold: 5, lastRestock: "2025-09-18", staff: "Staff #1" },
];

// Filter low stock items
const lowStockItems = inventoryData.filter(item => item.quantity < item.threshold);

const RestockingInfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restocking Info</Text>

      {lowStockItems.length === 0 ? (
        <Text style={styles.noData}>✅ All items are sufficiently stocked</Text>
      ) : (
        <FlatList
          data={lowStockItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text>Current Stock: {item.quantity}</Text>
              <Text>Threshold: {item.threshold}</Text>
              <Text>⚠️ Needs Restock: {item.threshold - item.quantity} units</Text>
              <Text>Last Restock Date: {item.lastRestock}</Text>
              <Text>Restocked By: {item.staff}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default RestockingInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noData: {
    fontSize: 16,
    color: "green",
  },
});
