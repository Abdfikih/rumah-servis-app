import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CartCountContext } from "../context/CartCountContext";
import { COLORS, SIZES } from "../constants/theme";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Counter from "../components/Counter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import fetchserve from "../hook/fetchServe";
import LoadingScreen from "../components/LoadingScreen";
import { LoginContext } from "../context/LoginContext";
import fetchDefaultAddress from "../hook/fetchDefaultAddress";
import { DefaultAddress } from "../context/DefaultAddress";
import fetchshop from "../hook/fetchShop";
import { shopContext } from "../context/ShopContext";

const servePage = ({ route, navigation }) => {
  const item = route.params.item;
  const serveId = item._id;
  const shopId = item.shop;
  const { shopInfo } = fetchshop(shopId);
  const { shopObj, setshopObj } = useContext(shopContext);
  const { serve, isLoading, error, refetch } = fetchserve(serveId);
  const [isChecked, setIsChecked] = useState(false);
  const [additives, setAdditives] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shop, setshop] = useState(1);
  const [count, setCount] = useState(1);
  const [preference, setPreference] = useState("");
  const { cartCount, setCartCount } = useContext(CartCountContext);
  const { defaultAd, setDefaultAd } = useContext(DefaultAddress);
  const { login } = useContext(LoginContext);
  if (login) {
    const {} = fetchDefaultAddress();
  } else {
    navigation.replace("login");
  }

  if (isLoading) {
    <LoadingScreen />;
  }

  const id = item.shop;

  const createOrderItem = (item) => {
    if (defaultAd == null) {
      navigation.navigate("address");
    } else {
      const sendToOrderPage = {
        orderItem: {
          serveId: item._id,
          additives: additives,
          quantity: count,
          price: (item.price + totalPrice) * count,
          instructions: preference,
        },
        serve: serve.shop,
        title: item.title,
        description: item.description,
        imageUrl: item.imageUrl[0],
        shop: id,
      };
      navigation.navigate("order-page", sendToOrderPage);
    }
  };

  const handleAdditives = (newAdditive) => {
    setAdditives((prevAdditives) => {
      const exists = prevAdditives.some(
        (additive) => additive.id === newAdditive.id
      );

      if (exists) {
        return prevAdditives.filter(
          (additive) => additive.id !== newAdditive.id
        );
      } else {
        return [...prevAdditives, newAdditive];
      }
    });
  };

  const handlePress = (item) => {
    const cartItem = {
      productId: item._id,
      additives: additives,
      quantity: count,
      totalPrice: (item.price + totalPrice) * count,
    };
    addToCart(cartItem);
  };

  const addToCart = async (cartItem) => {
    const token = await AsyncStorage.getItem("token");
    const accessToken = JSON.parse(token);

    try {
      const response = await axios.post(
        "http://10.0.2.2:6002/api/cart",
        cartItem,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setCartCount(response.data.count);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [additives]);

  const calculatePrice = () => {
    const total = additives.reduce((sum, additive) => {
      return sum + parseFloat(additive.price);
    }, 0);
    setTotalPrice(total);
  };

  return (
    <View style={{ backgroundColor: COLORS.lightWhite, height: SIZES.height }}>
      <View>
        <Image
          source={{ uri: item.imageUrl[0] }}
          style={{
            width: SIZES.width,
            height: SIZES.height / 4,
            borderBottomRightRadius: 30,
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backbtn}
        >
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {}} style={styles.sharebtn}>
          <MaterialCommunityIcons
            name="share-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>

        <View style={{ position: "absolute", bottom: 15, right: 3 }}>
          <TouchableOpacity
            style={styles.restBtn}
            onPress={() => {
              navigation.navigate("shop", shopInfo), setshopObj(shopInfo);
            }}
          >
            <Text style={{ color: COLORS.lightWhite, fontFamily: "bold" }}>
              Open the Store
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={[styles.title, { color: COLORS.primary }]}>
            IDR{((item.price + totalPrice) * count).toFixed(2)}
          </Text>
        </View>

        <Text style={styles.small}>{item.description}</Text>

        <FlatList
          data={item.serveTags}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item}
          style={{ marginTop: 10 }}
          horizontal
          scrollEnabled
          renderItem={({ item }) => (
            <View style={styles.tags}>
              <Text style={{ paddingHorizontal: 4, color: COLORS.lightWhite }}>
                {item}
              </Text>
            </View>
          )}
        />

        <Text style={[styles.title, { marginBottom: 10, marginTop: 20 }]}>
          Additives and Requests
        </Text>

        <FlatList
          data={item.additives}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 10 }}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <BouncyCheckbox
                size={20}
                unfillColor="#FFFFFF"
                fillColor={COLORS.primary}
                innerIconStyle={{ borderWidth: 1 }}
                textStyle={styles.small}
                text={item.title}
                onPress={() => {
                  handleAdditives(item);
                }}
              />

              <Text style={styles.small}>IDR {item.price}</Text>
            </View>
          )}
        />

        <Text style={[styles.title, { marginBottom: 10, marginTop: 20 }]}>
          Preferences
        </Text>

        <View style={styles.input}>
          <TextInput
            placeholder="Add specific instructions"
            value={preference}
            onChangeText={(value) => setPreference(value)}
            autoCapitalize={"none"}
            autoCorrect={false}
            style={{ flex: 1 }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={[styles.title, { marginBottom: 10 }]}>Quantity</Text>
          <Counter count={count} setCount={setCount} />
        </View>
      </View>
      <View style={{ left: 10, top: 40 }}>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View syle={styles.suspended}>
            <View style={styles.cart}>
              <View style={styles.cartRow}>
                <TouchableOpacity
                  onPress={() => {
                    handlePress(item);
                  }}
                  style={styles.cartbtn}
                >
                  <AntDesign
                    name="pluscircleo"
                    size={24}
                    color={COLORS.lightWhite}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => createOrderItem(item)}
                  style={{
                    backgroundColor: COLORS.primary,
                    paddingHorizontal: 80,
                    borderRadius: 30,
                  }}
                >
                  <Text
                    style={[
                      styles.title,
                      {
                        color: COLORS.lightWhite,
                        marginTop: 4,
                        alignItems: "center",
                      },
                    ]}
                  >
                    Order
                  </Text>
                </TouchableOpacity>

                <View style={styles.cartbtn}>
                  <Text
                    style={[
                      styles.title,
                      {
                        color: COLORS.lightWhite,
                        marginTop: 4,
                        alignItems: "center",
                      },
                    ]}
                  >
                    {cartCount}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default servePage;

const styles = StyleSheet.create({
  backbtn: {
    marginLeft: 12,
    alignItems: "center",
    zIndex: 999,
    position: "absolute",
    top: SIZES.xxLarge,
  },
  title: {
    fontSize: 22,
    fontFamily: "medium",
    color: COLORS.black,
  },
  sharebtn: {
    marginRight: 12,
    alignItems: "center",
    zIndex: 999,
    right: 0,
    position: "absolute",
    top: SIZES.xxLarge + 3,
  },
  restBtn: {
    borderColor: COLORS.lightWhite,
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 20,
    padding: 5,
    marginRight: 10,
  },
  container: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  small: {
    fontSize: 13,
    fontFamily: "regular",
    color: COLORS.gray,
    textAlign: "justify",
  },
  tags: {
    right: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  input: {
    borderColor: COLORS.primary1,
    borderWidth: 1,
    backgroundColor: COLORS.offwhite,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  suspended: {
    position: "absolute",
    zIndex: 999,

    width: "100%",
    alignItems: "center",
  },
  cart: {
    width: SIZES.width - 24,
    height: 60,
    justifyContent: "center",
    backgroundColor: COLORS.primary1,
    borderRadius: 30,
  },
  cartRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
  cartbtn: {
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
});
