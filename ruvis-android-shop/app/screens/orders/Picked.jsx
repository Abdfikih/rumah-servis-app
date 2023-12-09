import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, {useContext} from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import LoadingScreen from '../../components/LoadingScreen'
import CategoryServeComp from '../../components/CategoryServeComp'
import fetchPicked from '../../hook/fetchPicked'
import { useNavigation } from '@react-navigation/native'
import { DeliveryContext } from '../../context/DeliveryContext'
import BackGroundImage from '../../components/BackGroundImage'
import { TriggerContext } from '../../context/TriggerContext'

const Picked = () => {
  const navigation = useNavigation();
    const { orders, isOrdersLoading, error, refetch } = fetchPicked("2");
    const { delivery, setDelivery } = useContext(DeliveryContext);
    const { trigger, setTrigger } = useContext(TriggerContext);

    if (isOrdersLoading) {
      return <LoadingScreen />;
    }

    const handlePress = (item) => {
      setDelivery('Out-for-Delivery');
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
        <BackGroundImage/>
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
}

export default Picked

const styles = StyleSheet.create({})