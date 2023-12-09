import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants/theme";

import { RatingInput, Rating } from "react-native-stock-star-rating";
import NetworkImage from "./NetworkImage";

const CategoryServeComp = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <View style={styles.innerRow}>
        <NetworkImage
          data={item.imageUrl[0]}
          width={100}
          height={100}
          raduis={16}
        />
        <View
          style={{
            position: "absolute",
            right: 10,
            bottom: 10,
            backgroundColor: COLORS.secondary,
            borderRadius: 8,
          }}
        >
          <Text
            style={[
              styles.shop,
              { color: COLORS.lightWhite, marginHorizontal: 5 },
            ]}
          >{` \$ IDR ${item.price}`}</Text>
        </View>

        <View style={styles.row}>
          <View>
            <Text style={styles.shop}>{item.title}</Text>

            <FlatList
              data={item.serveTags.slice(0, 3)}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item}
              style={{ marginTop: 5, marginBottom: 5 }}
              horizontal
              scrollEnabled
              renderItem={({ item }) => (
                <View
                  style={{
                    right: 10,
                    marginHorizontal: 10,
                    backgroundColor: COLORS.gray2,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      paddingHorizontal: 4,
                      color: COLORS.lightWhite,
                      fontFamily: "regular",
                      fontSize: 11,
                    }}
                  >
                    {item}
                  </Text>
                </View>
              )}
            />

            <Text style={styles.reviews}>{item.ratingCount} Reviews</Text>
            <Rating
              rating={item.rating}
              color={COLORS.secondary}
              size={20}
              maxStars={5}
              bordered={false}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryServeComp;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width - 26,
    height: 120,
    marginBottom: 10,
    borderRadius: 12,
  },
  innerRow: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: COLORS.offwhite,
    borderRadius: 16,
  },
  row: {
    marginLeft: 10,
    marginTop: 10,
  },
  shop: { fontFamily: "medium", fontSize: 14 },
  reviews: {
    fontFamily: "regular",
    fontSize: 12,
    color: COLORS.gray,
  },
  price: {
    paddingLeft: 18,
    paddingTop: 5,
    fontFamily: "bold",
    fontSize: 17,
    color: COLORS.lightWhite,
  },
  reOrderTxt: {
    fontFamily: "medium",
    fontSize: 16,
    color: COLORS.lightWhite,
  },
});
