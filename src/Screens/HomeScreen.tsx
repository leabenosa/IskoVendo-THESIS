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
      <TouchableOpacity style={styles.addProduct} onPress={() => navigation.navigate("AddProduct")}>
        <Text style={styles.addProductText}>Add Products</Text>
      </TouchableOpacity>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("InventoryDashboard")}>
          <Text style={styles.cardText}>Inventory Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("TransactionLogs")}>
          <Text style={styles.cardText}>Transaction Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("MachineStatus")}>
          <Text style={styles.cardText}>Machine Status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("RestockingInfo")}>
          <Text style={styles.cardText}>Restocking Info</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  addProduct: {
    height: 120,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    elevation: 4,
  },
  addProductText: { fontSize: 20, fontWeight: "bold" },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: {
    width: "48%",
    height: 120,
    backgroundColor: "#6a1b9a",
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  cardText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});
