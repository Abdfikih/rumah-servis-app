import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import { COLORS, SIZES } from "../constants/theme";

const NoParcel = () => {
  const animation = useRef(null);
  return (
    <View style={{ backgroundColor: COLORS.primary, height: SIZES.height }}>
      <View
        style={{
          backgroundColor: "white",
          height: SIZES.height - 100,
          borderBottomEndRadius: 30,
          borderBottomStartRadius: 30,
        }}
      >
        <LottieView
          autoPlay
          ref={animation}
          style={{ width: "100%", height: SIZES.height / 3.2, paddingTop: 100, paddingLeft: 130 }}
          source={require("../../assets/anime/delivery.json")}
        />

        <Text style={{top: SIZES.height / 3.2, left: 80, fontFamily: "bold", fontSize: 25}}>No Service Selected</Text>
      </View>
    </View>
  );
};

export default NoParcel;

const styles = StyleSheet.create({});
