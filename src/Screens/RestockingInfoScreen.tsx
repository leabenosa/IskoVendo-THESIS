
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useProducts } from "../context/ProductContext"; 

const RestockingInfoScreen = () => {
  const { products } = useProducts();


  const lowStockItems = products.filter(
    (item) => item.quantity < (item.threshold ?? 10)
  );

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
              <Text>Threshold: {item.threshold ?? 10}</Text>
              <Text>
                ⚠️ Needs Restock: {(item.threshold ?? 10) - item.quantity} units
              </Text>
              <Text>Last Restock Date: {item.date ?? "N/A"}</Text>
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
