import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type HomeScreenProp = StackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenProp>();

  return (
    <View style={styles.container}>
      {/* Header / Main Action */}
      <TouchableOpacity
        style={styles.mainCard}
        onPress={() => navigation.navigate("AddProduct")}
      >
        <Text style={styles.mainTitle}>➕ Add / Update Products</Text>
      </TouchableOpacity>

      {/* Machine Monitoring */}
      <Text style={styles.sectionTitle}>📊 Machine Monitoring</Text>
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("InventoryDashboard")}
        >
          <Text style={styles.cardText}>Inventory</Text>
          <Text style={styles.cardSub}>Realtime stock</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("TransactionLogs")}
        >
          <Text style={styles.cardText}>Transactions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("MachineStatus")}
        >
          <Text style={styles.cardText}>Machine Status</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("RestockingInfo")}
        >
          <Text style={styles.cardText}>Restocking</Text>
          <Text style={styles.cardSub}>Low stock info</Text>
        </TouchableOpacity>
      </View>

      {/* Alerts Section */}
      <Text style={styles.sectionTitle}>🚨 Alerts</Text>
      <View style={styles.alertGrid}>
        <View style={styles.alertCard}>
          <Text style={styles.alertText}>⚠ Low Stock</Text>
        </View>

        <View style={styles.alertCard}>
          <Text style={styles.alertText}>🪙 Coin Full</Text>
        </View>

        <View style={styles.alertCard}>
          <Text style={styles.alertText}>🚪 Door Open</Text>
          <Text style={styles.alertSub}>Security warning</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },

  mainCard: {
    height: 120,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 4,
  },

  mainTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  subText: {
    fontSize: 13,
    color: "#666",
    marginTop: 5,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    height: 110,
    backgroundColor: "#5f0707ea",
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  cardSub: {
    color: "#ddd",
    fontSize: 12,
    marginTop: 5,
  },

  alertGrid: {
    marginTop: 10,
  },

  alertCard: {
    backgroundColor: "#fff3cd",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },

  alertText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#856404",
  },

  alertSub: {
    fontSize: 12,
    color: "#856404",
  },
});
