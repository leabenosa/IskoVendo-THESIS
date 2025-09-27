/**
 * IskoVendo School Supplies Vending Machine
 * Main App Entry
 */

import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { ProductProvider } from "./src/context/ProductContext"; // ✅ named import

function App() {
  return (
    <ProductProvider>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <AppNavigator />
      </NavigationContainer>
    </ProductProvider>
  );
}

export default App;
