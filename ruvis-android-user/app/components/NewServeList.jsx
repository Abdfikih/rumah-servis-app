import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import uidata from "../constants/uidata";
import ServeComponent from "./ServeComponent";
import { useNavigation } from "@react-navigation/native";
import fetchRecommendations from "../hook/recommendationsHook";
import ReusableShimmer from "./Shimmers/ReusableShimmer";
import { SIZES } from "../constants/theme";

  const NewserveList = ({code}) => {
  const navigation = useNavigation();
  const {recommendations, isLoading, error, refetch} = fetchRecommendations(code)  

  if (isLoading) {
    return (
      <View style={{marginLeft: 12, marginBottom: 10}}>
      <FlatList
        data={[ {
          "_id": "6571cf6c1ff85fa41907fcc3",
          "title": "Vehicle Repair",
          "serveTags": [
              "Car",
              "Motorcycle",
              "Other"
          ],
          "category": "653120babbe4998e90af3ff1",
          "serveType": [
              "Service",
              "Tire Repair",
              "Custom",
              "Consultation",
              null
          ],
          "code": "Anugerah Motor",
          "isAvailable": true,
          "shop": "6537a4448cd1bd140ebddcee",
          "rating": 4.7,
          "ratingCount": "280",
          "description": "Vehicle Fit, You Happy.",
          "price": "69.900",
          "additives": [
              {
                  "id": 1,
                  "title": "Service",
                  "price": "35000"
              },
              {
                  "id": 2,
                  "title": "Tire Repair",
                  "price": "15000"
              },
              {
                  "id": 3,
                  "title": "Custom",
                  "price": "25000"
              },
              {
                  "id": 4,
                  "title": "Consultation",
                  "price": "10000"
              }
          ],
          "imageUrl": [
              "https://ik.imagekit.io/abdfikih/anugerah-motor.jpg"
          ],
          "__v": 1,
        },
       ]}
        horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 5, rowGap: 10 }}
              scrollEnabled
              renderItem={renderItem}
      />
    </View>
    );
  }


  const renderItem = ({ item }) => (
    <ServeComponent item={item} onPress={() => navigation.navigate('serve-nav', item)} />
  );


  return (
    <View style={{marginLeft: 12, marginBottom: 10}}>
      <FlatList
        data={recommendations}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 5, rowGap: 10 }}
        scrollEnabled
        renderItem={renderItem}
      />
    </View>
  );
}


export default NewserveList;

const styles = StyleSheet.create({});
