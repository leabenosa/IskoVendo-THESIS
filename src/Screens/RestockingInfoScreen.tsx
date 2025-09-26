import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RestockingInfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restocking Info</Text>
      <Text>Recommended Restock Quantities: Example Data</Text>
      <Text>Last Restock Date: 2025-09-25</Text>
      <Text>Restocked By: Staff #1</Text>
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
