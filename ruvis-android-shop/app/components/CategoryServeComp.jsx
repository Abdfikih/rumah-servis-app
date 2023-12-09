import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants/theme";
import NetworkImage from "./NetworkImage";
import { calculateDistance, calculateTravelTime } from "../services/Distance";
import { useContext } from "react";
import { UserLocationContext } from "../context/UserLocationContext";
import { DeliveryContext } from "../context/DeliveryContext";

const CategoryServeComp = ({ item, onPress }) => {
  const { location, setLoaction } = useContext(UserLocationContext);

  const coords2 = {
    latitude: item.shopCoords[1],
    longitude: item.shopCoords[0],
  };

  const coords1 = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };

  const coords3 = {
    latitude: item.recipientCoords[1],
    longitude: item.recipientCoords[0],
  };

  const toshop = calculateDistance(coords1, coords2);
  const toClient = calculateDistance(coords2, coords3);

  const totalDistance = parseFloat(toshop) + parseFloat(toClient);

  return (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: COLORS.lightWhite,
              borderRadius: 12,
              margin: 5,
            }}
          >
            <NetworkImage
              data={item.shopId.imageUrl}
              width={55}
              height={63}
              raduis={10}
            />
          </View>

          <View
            style={{
              backgroundColor: COLORS.secondary,
              borderRadius: 8,
              position: "absolute",
              top: 10,
              right: 5,
            }}
          >
            <Text
              style={[
                styles.shop,
                { color: COLORS.lightWhite, marginHorizontal: 5 },
              ]}
            >
              Pick up
            </Text>
          </View>

          <View style={styles.row}>
            <View style={{ width: SIZES.width / 1.7 }}>
              <Text
                style={[styles.shop, { color: COLORS.gray }]}
                numberOfLines={1}
              >
                📍{item.shopId.coords.address}
              </Text>
              <Text
                style={[styles.shop, { color: COLORS.gray }]}
                numberOfLines={1}
              >
                🏡 {item.deliveryAddress.addressLine1}{" "}
                {item.deliveryAddress.district} {item.deliveryAddress.city}
              </Text>
            </View>
            <Text
              style={[
                styles.shop,
                { color: COLORS.primary, marginVertical: 5 },
              ]}
            >
              {" "}
              💲{item.deliveryFee} | Distance To:📍{toshop} km | Distance To: 🏡{" "}
              {toClient} km{" "}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryServeComp;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: COLORS.offwhite,
    marginLeft: 10,
    width: SIZES.width - 40,
    height: 70,
    borderRadius: 12,
  },
  row: {
    marginLeft: 10,
    marginTop: 10,
  },
  shop: { fontFamily: "regular", fontSize: 11 },
});
