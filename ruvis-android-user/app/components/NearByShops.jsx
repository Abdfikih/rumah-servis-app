import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import uidata from "../constants/uidata";
import StoreComponent from "./StoreCompon";
import { useNavigation } from "@react-navigation/native";
import { shopContext } from "../context/ShopContext";
import fetchNearBy from "../hook/nearByShops";
import { SIZES } from "../constants/theme";
import ReusableShimmer from "./Shimmers/ReusableShimmer";

const NearByshops = ({ code }) => {
  const navigation = useNavigation();
  const { shopObj, setshopObj } = useContext(shopContext);

  const { shops, isLoading, error, refetch } = fetchNearBy(code);

  if (isLoading) {
    return (
      <FlatList
        data={uidata.serves}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ marginTop: 5, rowGap: 5 }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginLeft: 12 }}>
            <ReusableShimmer
              width={SIZES.width - 80}
              height={SIZES.height / 5.3}
              radius={16}
            />
          </View>
        )}
      />
    );
  }

  return (
    <View style={{ marginLeft: 12 }}>
      <FlatList
        data={shops}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5, rowGap: 10 }}
        scrollEnabled
        renderItem={({ item }) => (
          <StoreComponent
            item={item}
            onPress={() => {
              navigation.navigate("shop", item), setshopObj(item);
            }}
          />
        )}
      />
    </View>
  );
};

export default NearByshops;

const styles = StyleSheet.create({});
