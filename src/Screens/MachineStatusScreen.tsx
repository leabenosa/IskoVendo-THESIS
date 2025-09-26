import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MachineStatusScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Machine Status</Text>
      <Text>Online / Offline: Online</Text>
      <Text>Error Logs: None</Text>
      <Text>Maintenance Reminders: No pending tasks</Text>
    </View>
  );
};

export default MachineStatusScreen;

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
