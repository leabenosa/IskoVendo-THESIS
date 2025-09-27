import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const dummyLogs = [
  { id: "1", date: "2025-09-25 10:30", item: "Pen", payment: "Cash", status: "success" },
  { id: "2", date: "2025-09-25 11:00", item: "Notebook", payment: "Cash", status: "failed", reason: "Insufficient balance" },
  { id: "3", date: "2025-09-25 11:30", item: "Pen", payment: "Cash", status: "success" },
  { id: "4", date: "2025-09-25 12:00", item: "Notebook", payment: "Cash", status: "failed", reason: "Item out of stock" },
];

const TransactionLogsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaction Logs</Text>
      <FlatList
        data={dummyLogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.logItem,
              item.status === "failed" ? styles.failedItem : styles.successItem,
            ]}
          >
            <Text>{item.date}</Text>
            <Text>Item: {item.item}</Text>
            <Text>Payment: {item.payment}</Text>
            <Text
              style={[
                styles.status,
                item.status === "failed" ? styles.failedText : styles.successText,
              ]}
            >
              {item.status.toUpperCase()}
            </Text>
            {item.status === "failed" && (
              <Text style={styles.reason}>Reason: {item.reason}</Text>
            )}
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
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
  },
  successItem: {
    borderColor: "green",
  },
  failedItem: {
    borderColor: "red",
  },
  status: {
    fontWeight: "bold",
    marginTop: 4,
  },
  successText: {
    color: "green",
  },
  failedText: {
    color: "red",
  },
  reason: {
    color: "red",
    marginTop: 2,
    fontStyle: "italic",
  },
});
