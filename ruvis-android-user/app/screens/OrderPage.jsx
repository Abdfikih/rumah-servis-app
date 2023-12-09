import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import LoadingScreen from "../components/LoadingScreen";
import * as Location from "expo-location";
import axios from "axios";
import { COLORS } from "../constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultAddress } from "../context/DefaultAddress";
import { RecipientCoords } from "../context/RecipientCoords";
import * as WebBrowser from "expo-web-browser";

const OrderPage = () => {
  const { defaultAd, setDefaultAd } = useContext(DefaultAddress);
  const { coords } = useContext(RecipientCoords);
  const [orderId, setOrderId] = useState(null);
  const route = useRoute();
  const order = route.params;
  deliveryfee = 2;

  const orderObject = {
    userId: defaultAd.userId,
    orderItems: [order.orderItem],
    orderTotal: order.orderItem.price,
    shopAddress: order.serve.coords.address,
    shopCoords: [order.serve.coords.longitude, order.serve.coords.latitude],
    recipientCoords: [-6.361233, 106.824119],
    deliveryFee: deliveryfee,
    grandTotal: order.orderItem.price * order.orderItem.quantity + deliveryfee,
    deliveryAddress: defaultAd._id,
    paymentMethod: "Stripe",
    shopId: order.shop,
  };

  const createOrder = async (orderObject) => {
    const token = await AsyncStorage.getItem("token");
    const accessToken = JSON.parse(token);

    try {
      const response = await axios.post(
        "http://10.0.2.2:6002/api/orders",
        orderObject,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 201) {
        console.log(response.data.data._id);

        setOrderId(response.data.data);
      }
      if (orderId !== null) {
        createCheckOut(orderId._id);
      }
    } catch (error) {
      console.error(
        "There was a problem with the axios request:",
        error.message
      );
    }
  };

  const createCheckOut = async (id) => {
    console.log(id);
    try {
      const response = await axios.post(
        "https://servelypayment-production.up.railway.app/stripe/create-checkout-session",
        {
          userId: defaultAd.userId,
          cartItems: [
            {
              name: order.title,
              id: id,
              price: order.orderItem.price,
              quantity: order.orderItem.quantity,
              shopId: order.shop,
            },
          ],
        }
      );

      const data = response.data;
      console.log("Session URL:", data.url);
      setPaymentUrl(data.url);

      const result = await WebBrowser.openBrowserAsync(data.url);
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.error(`HTTP error! Status: ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response was received for the request");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error", error.message);
      }
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.orderBtn}
        onPress={() => createOrder(orderObject)}
      >
        <Text>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderPage;

const styles = StyleSheet.create({
  orderBtn: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: COLORS.secondary,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
});
