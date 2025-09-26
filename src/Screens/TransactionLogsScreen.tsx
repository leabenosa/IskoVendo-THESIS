import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const dummyLogs = [
  { id: "1", date: "2025-09-25 10:30", item: "Pen", payment: "GCash" },
  { id: "2", date: "2025-09-25 11:00", item: "Notebook", payment: "Card" },
];

const TransactionLogsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Logs</Text>
      <FlatList
        data={dummyLogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text>{item.date}</Text>
            <Text>Item: {item.item}</Text>
            <Text>Payment: {item.payment}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default TransactionLogsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  logItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
});
