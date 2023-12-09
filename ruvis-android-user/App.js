import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";
import BottomTab from "./app/navigation/BottomTab";
import { UserLocationContext } from "./app/context/UserLocationContext";
import { LoginContext } from "./app/context/LoginContext";
import { DefaultAddress } from "./app/context/DefaultAddress";
import { CartCountContext } from "./app/context/CartCountContext";
import { shopContext } from "./app/context/ShopContext";
import { UserReversedGeoCode } from "./app/context/UserReversedGeoCode";
import ServeNavigator from "./app/navigation/ServeNavigator";
import ShopPage from "./app/navigation/ShopPage";
import Shop from "./app/screens/shop/Shop";
import AddRating from "./app/screens/AddRating";
import SignUp from "./app/screens/SignUp";
import { RecipientCoords } from "./app/context/RecipientCoords";
import LoginPage from "./app/screens/LoginPage";
import AddressPage from "./app/screens/AddressPage";
import RegisterShop from "./app/screens/RegisterShop";

const Stack = createNativeStackNavigator();

export default function App() {
  const [location, setLocation] = useState(null);
  const [defaultAd, setDefaultAd] = useState(null);
  const [login, setLogin] = useState(false);
  const [address, setAddress] = useState(null);
  const [coords, setCoords] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [shopObj, setshopObj] = useState(null);
  const [error, setErrorMsg] = useState(null);

  const defaultAddresss = {
    city: "Shanghai",
    country: "China",
    district: "Pudong",
    isoCountryCode: "CN",
    name: "33 East Nanjing Rd",
    postalCode: "94108",
    region: "SH",
    street: "Stockton St",
    streetNumber: "1",
    subregion: "San Francisco County",
    timezone: "America/Los_Angeles",
  };

  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    (async () => {
      setAddress(defaultAddresss);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location as denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (!fontsLoaded) {
    return;
  }

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <DefaultAddress.Provider value={{ defaultAd, setDefaultAd }}>
        <UserReversedGeoCode.Provider value={{ address, setAddress }}>
          <shopContext.Provider value={{ shopObj, setshopObj }}>
            <LoginContext.Provider value={{ login, setLogin }}>
              <CartCountContext.Provider value={{ cartCount, setCartCount }}>
                <RecipientCoords.Provider value={{ coords, setCoords }}>
                  <NavigationContainer>
                    <Stack.Navigator>
                      <Stack.Screen
                        name="bottom-navigation"
                        component={BottomTab}
                        options={{ headerShown: false }}
                      />

                      <Stack.Screen
                        name="serve-nav"
                        component={ServeNavigator}
                        options={{ headerShown: false }}
                      />

                      <Stack.Screen
                        name="shop-page"
                        component={ShopPage}
                        options={{ headerShown: false }}
                      />

                      <Stack.Screen
                        name="shop"
                        component={Shop}
                        options={{ headerShown: false }}
                      />

                      <Stack.Screen
                        name='register-shop'
                        component={RegisterShop}
                        options={{ headerShown: false }}
                      />

                      <Stack.Screen
                        name="signUp"
                        component={SignUp}
                        options={{ headerShown: false }}
                      />

                      <Stack.Screen
                        name="rating"
                        component={AddRating}
                        options={{ headerShown: false }}
                      />

                      <Stack.Screen
                        name="login"
                        component={LoginPage}
                        options={{ headerShown: false }}
                      />

                      <Stack.Screen
                        name="address"
                        component={AddressPage}
                        options={{ headerShown: false }}
                      />
                    </Stack.Navigator>
                  </NavigationContainer>
                </RecipientCoords.Provider>
              </CartCountContext.Provider>
            </LoginContext.Provider>
          </shopContext.Provider>
        </UserReversedGeoCode.Provider>
      </DefaultAddress.Provider>
    </UserLocationContext.Provider>
  );
}
