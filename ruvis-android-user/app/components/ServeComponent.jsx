import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import NetworkImage from "./NetworkImage";
import { COLORS, SIZES } from "../constants/theme";

const serveComponent = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <NetworkImage
        data={item.imageUrl[0]}
        width={SIZES.width - 60}
        height={SIZES.height / 5.8}
        raduis={16}
        mode={"cover"}
      />
      <Text style={styles.heading}>{item.title}</Text>
      <Text style={styles.small}>{item.time} - delivery time</Text>

    </TouchableOpacity>
  );
};

export default serveComponent;

const styles = StyleSheet.create({
  wrapper: {
    marginRight: 15,
    backgroundColor: COLORS.lightWhite,
    padding: 8,
    borderRadius: 16,
  },
  heading: {
    fontSize: 14,
    fontFamily: "regular",
    color: COLORS.gray,
  },
  small: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.gray,
  },
});
