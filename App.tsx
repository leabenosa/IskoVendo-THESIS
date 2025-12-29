import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ProductProvider } from "./src/Screens/ProductContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <ProductProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ProductProvider>
  );
}
