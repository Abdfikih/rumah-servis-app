import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity} from "react-native";
import React,{useRef, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants/theme";
import {Feather, AntDesign } from '@expo/vector-icons';
import styles from "./search.style";
import LottieView from "lottie-react-native";
import axios from "axios";
import pages from "./page.style";
import serveComponent from "../components/ServeComponent";
import CategoryServeComp from "../components/CategoryServeComp";

const Search = ({navigation}) => {
  const [searchKey, setSearchKey] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setLoading] = useState(false)
  const animation = useRef(null);

  if (isLoading) {
    return (
      <FlatList
        data={uidata.categories}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 5 }}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ marginLeft: 12 }}>
            <ReusableShimmer
             width={SIZES.width} 
             height={55} 
             radius={16}
             marginRight={12}
             />
          </View>
        )}
      />
    );
  }

  const handleSearch = async() =>{
    try {
      const response = await axios.get(`http://10.0.2.2:6002/api/serves/search/${searchKey}`)
      setSearchResults(response.data)
    } catch (error) {
      console.log("Failed to get products" , error);
    }
  };

  const renderItem = ({ item }) => (
    <CategoryServeComp item={item} onPress={() => navigation.navigate('serve-nav', item)} />
  );

  return (
    <SafeAreaView>
            <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
      <View style={styles.searchContainer}>
    
      <View style={styles.searchWrapper}>
      
        <TextInput 
        style={styles.input}
        value={searchKey}
        onChangeText={setSearchKey}
        placeholder='What do you want ?'
        />
      </View>

      <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        <Feather name='search' size={24} color={COLORS.lightWhite}/>
      </TouchableOpacity>
    </View>

    {searchResults.length === 0 ? (
      <View style={{width: SIZES.width, height: SIZES.height/1.5, right: 90}}>
         <LottieView
          autoPlay
          ref={animation}
          style={{ width: "100%", height: "100%", }}
          source={require("../../assets/anime/cook.json")}
        />
      </View>
    ): (
      <FlatList 
      data={searchResults}
      keyExtractor={(item)=> item._id}
      renderItem={renderItem}
      style={{left: 10}}
      />
    )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;


