import { View, FlatList } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { useContext } from "react";
import { UserType } from "../../context/UserType";
import LoadingScreen from "../../components/LoadingScreen";
import CategoryServeComp from "../../components/CategoryServeComp";
import fetchOrders from "../../hook/fetchOrders";
import { useNavigation } from '@react-navigation/native'
import { DeliveryContext } from "../../context/DeliveryContext";
import BackGroundImage from "../../components/BackGroundImage";
import { TriggerContext } from "../../context/TriggerContext";

const Pending = () => {
  const navigation = useNavigation();
  const { userType } = useContext(UserType);
  const { trigger, setTrigger } = useContext(TriggerContext);
  const { delivery, setDelivery } = useContext(DeliveryContext);
  const { orders, isOrdersLoading, error, refetch } = fetchOrders("Placed");

  if (isOrdersLoading) {
    return <LoadingScreen />;
  }

  const handlePress = (item) => {
    setDelivery('Placed');
    setTrigger(true);
    navigation.navigate("Notifications", item)
  }

  const renderCategoryItem = ({ item }) => (
    <View style={{marginBottom: 10}}>
      <CategoryServeComp item={item} onPress={() => handlePress(item)} />
    </View>
  );

  return (
    <View style={{ backgroundColor: COLORS.lightWhite, flex: 1}}>
      <BackGroundImage />
       <FlatList
          data={orders}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          style={{ marginTop: 10 }}
          scrollEnabled={false}
          renderItem={renderCategoryItem}
        />
    </View>
  );
};

export default Pending;
