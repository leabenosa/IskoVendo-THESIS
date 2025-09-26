/**
 * IskoVendo School Supplies Vending Machine
 * Main App Entry
 */

import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;
