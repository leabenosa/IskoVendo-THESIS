import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import AddProductScreen from "../Screens/AddProductScreen";
import InventoryDashboardScreen from "../Screens/InventoryDashboardScreen";
import TransactionLogsScreen from "../Screens/TransactionLogsScreen";
import MachineStatusScreen from "../Screens/MachineStatusScreen";
import RestockingInfoScreen from "../Screens/RestockingInfoScreen";

export type RootStackParamList = {
  Home: undefined;
  AddProduct: undefined;
  InventoryDashboard: undefined;
  TransactionLogs: undefined;
  MachineStatus: undefined;
  RestockingInfo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Itemize Plus" }} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="InventoryDashboard" component={InventoryDashboardScreen} />
      <Stack.Screen name="TransactionLogs" component={TransactionLogsScreen} />
      <Stack.Screen name="MachineStatus" component={MachineStatusScreen} />
      <Stack.Screen name="RestockingInfo" component={RestockingInfoScreen} />
    </Stack.Navigator>
  );
}
