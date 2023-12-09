import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import serveComponent from './ServeComponent';
import uidata from '../constants/uidata';
import ReusableShimmer from './Shimmers/ReusableShimmer';
import { SIZES } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';
import fetchRecommendations from '../hook/recommendationsHook';

const FastestNearYou = (code) => {

  const navigation = useNavigation();

  const {recommendations, isLoading, error, refetch} = fetchRecommendations(code)  
  
  if (isLoading) {
    return (
      <FlatList
        data={uidata.serves}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ marginTop: 5 , rowGap: 5}}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginLeft: 12 }}>
            <ReusableShimmer
             width={SIZES.width -80} 
             height={SIZES.height/5.3} 
             radius={16}
             />
          </View>
        )}
      />
    );
  }
    const renderItem = ({ item }) => (
        <serveComponent item={item} onPress={() => {}} />
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

export default FastestNearYou

const styles = StyleSheet.create({})