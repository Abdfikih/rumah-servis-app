import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRoute } from "@react-navigation/native";
import servePage from "../screens/ServePage";
import OrderPage from "../screens/OrderPage";

const Stack = createNativeStackNavigator();
const ServeNavigator = () => {
  const route = useRoute();
  const item = route.params;
  
  return (
    <Stack.Navigator initialRouteName="serve-page">
      <Stack.Screen
        name="serve-page"
        component={servePage}
        options={{ headerShown: false }}
        initialParams={{ item: item }}
      />

      <Stack.Screen
        name="order-page"
        component={OrderPage}
        options={{ headerShown: false, presentation: 'modal' }}
       
      />
    </Stack.Navigator>
  );
};

export default ServeNavigator;

const styles = StyleSheet.create({});
