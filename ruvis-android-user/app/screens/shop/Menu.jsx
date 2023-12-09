import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { shopContext } from "../../context/ShopContext";
import uidata from "../../constants/uidata";
import CategoryServeComp from "../../components/CategoryServeComp";
import fetchserveByShop from "../../hook/fetchServeByShops";
import ReusableShimmer from "../../components/Shimmers/ReusableShimmer";
import { SIZES } from "../../constants/theme";

const Menu = () => {
  const navigation = useNavigation();
  const { shopObj, setshopObj } = useContext(shopContext);
  const shopId = shopObj._id;
  const code = shopObj.code;

  const { serveList, isLoading, error, refetch } = fetchserveByShop(shopId, code);

  if (isLoading) {
    return (
      <View style={{ marginTop: 5 }}>
        <FlatList
          data={uidata.serves}
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 5 }}
          keyExtractor={(item) => item._id}
          scrollEnabled
          renderItem={({ item }) => (
            <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
              <ReusableShimmer
                width={SIZES.width - 20}
                height={120}
                radius={12}
              />
            </View>
          )}
        />
      </View>
    );
  }

  return (
    <View style={{ marginTop: 5 }}>
      <FlatList
        data={serveList}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 5 }}
        keyExtractor={(item) => item._id}
        scrollEnabled
        renderItem={({ item }) => (
          <View style={{ left: 10 }}>
            <CategoryServeComp
              item={item}
              onPress={() => navigation.navigate("serve-nav", item)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Menu;
