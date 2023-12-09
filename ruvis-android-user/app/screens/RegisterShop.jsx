import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
  } from "react-native";
  import React, { useState, useRef, useContext, useEffect } from "react";
  import styles from "./login.style";
  import { Formik } from "formik";
  import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
  import { COLORS, SIZES } from "../constants/theme";
  import { BackBtn, Button } from "../components";
  import axios from "axios";
  
  const RegisterShop = ({ navigation }) => {
    const animation = useRef(null);
    const [loader, setLoader] = useState(false);
    const [title, setTitle] = useState("");
    const [owner, setOwner] = useState("");
    const { code, setCode } = useState("");
    const { logoUrl, setLogoUrl } = useState("");
    const { imageUrl, setImageUrl } = useState("");
    const [coords, setCoords] = useState({
      id: 2023,
      latitude: -6.366757,
      longitude: 106.824312,
      address: "Universitas Indonesia",
      title: "Ruvis APP",
    });
    const [webpImage, setWebpImage] = useState(null);
  
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
  
    const [obsecureText, setObsecureText] = useState(false);
  
    const [imageSource, setImageSource] = useState(null);
  
    const handleImagePicker = () => {
      ImagePicker.showImagePicker({ title: "Select Image" }, (response) => {
        if (!response.didCancel && !response.error) {
          // Use the response.uri as the image source
          setImageSource(response.uri);
        }
      });
    };
  
    const inValidForm = () => {
      Alert.alert("Invalid Form", "Please provide all required fields", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Continue",
          onPress: () => {},
        },
        { defaultIndex: 1 },
      ]);
    };
  
    const registerUser = async (values) => {
      setLoader(true);
  
      try {
        const endpoint = "http://10.0.2.2:6002/register";
        const data = values;
  
        const response = await axios.post(endpoint, data);
        if (response.status === 201) {
          setLoader(false);
  
          navigation.navigate("login");
        } else {
          Alert.alert("Error Logging in ", "Please provide valid credentials ", [
            {
              text: "Cancel",
              onPress: () => {},
            },
            {
              text: "Continue",
              onPress: () => {},
            },
            { defaultIndex: 1 },
          ]);
        }
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Error ",
          "Oops, Error logging in try again with correct credentials",
          [
            {
              text: "Cancel",
              onPress: () => {},
            },
            {
              text: "Continue",
              onPress: () => {},
            },
            { defaultIndex: 1 },
          ]
        );
      } finally {
        setLoader(false);
      }
    };
  
    const handleCoordinateInput = async (coordinate) => {
      try {
        const apiKey = "AIzaSyCzNP5qQql2a5y8lOoO-1yj1lj_tzjVImA"; // Replace with your Google Maps API key
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            coordinate
          )}&key=${apiKey}`
        );
  
        if (response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry.location;
          setLatitude(lat);
          setLongitude(lng);
          console.log(lat, lng);
        } else {
          console.error("No results found for the given coordinate.");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };
  
    return (
      <ScrollView style={{ backgroundColor: COLORS.white }}>
        <View style={{ marginHorizontal: 20, marginTop: 50 }}>
          <BackBtn onPress={() => navigation.goBack()} />
  
          <Text style={styles.titleLogin}>Register Shop</Text>
          <Formik
            initialValues={{
              title: "",
              password: "",
              owner: "",
              code: "",
              logoUrl: "",
              imageUrl: "",
              coords: {
                id: 2023,
                latitude: -6.366757,
                longitude: 106.824312,
                address: "Universitas Indonesia",
                title: "Ruvis APP",
              },
            }}
            onSubmit={(values) => registerUser(values)}
          >
            {({
              handleChange,
              handleBlur,
              touched,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Owner</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.owner ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="face-man-profile"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
  
                    <TextInput
                      placeholder="Name Owner"
                      onFocus={() => {
                        setFieldTouched("owner");
                      }}
                      onBlur={() => {
                        setFieldTouched("owner", "");
                      }}
                      value={values.owner}
                      onChangeText={handleChange("owner")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.owner && errors.owner && (
                    <Text style={styles.errorMessage}>{errors.owner}</Text>
                  )}
                </View>
  
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Title Shop</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.title ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="shopping-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
  
                    <TextInput
                      placeholder="Enter title"
                      onFocus={() => {
                        setFieldTouched("title");
                      }}
                      onBlur={() => {
                        setFieldTouched("title", "");
                      }}
                      value={values.title}
                      onChangeText={handleChange("title")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.title && errors.title && (
                    <Text style={styles.errorMessage}>{errors.title}</Text>
                  )}
                </View>
  
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Code Shop</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.Code ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="barcode-scan"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
  
                    <TextInput
                      placeholder="Enter Code"
                      onFocus={() => {
                        setFieldTouched("Code");
                      }}
                      onBlur={() => {
                        setFieldTouched("Code", "");
                      }}
                      value={values.Code}
                      onChangeText={handleChange("Code")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.code && errors.code && (
                    <Text style={styles.errorMessage}>{errors.code}</Text>
                  )}
                </View>
  
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Logo Shop</Text>
                  <TouchableOpacity onPress={handleImagePicker}>
                    <View
                      style={styles.inputWrapper(
                        touched.logo ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      {imageSource ? (
                        <Image
                          source={{ uri: imageSource }}
                          style={{ width: 20, height: 20, marginRight: 10 }}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="shopping-search"
                          size={20}
                          color={COLORS.gray}
                          style={styles.iconStyle}
                        />
                      )}
  
                      <TextInput
                        placeholder="Enter URL Logo"
                        onFocus={() => {
                          setFieldTouched("logo");
                        }}
                        onBlur={() => {
                          setFieldTouched("logo", "");
                        }}
                        value={values.logo}
                        onChangeText={handleChange("logo")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                      />
                    </View>
                  </TouchableOpacity>
                  {touched.logo && errors.logo && (
                    <Text style={styles.errorMessage}>{errors.logo}</Text>
                  )}
                </View>
  
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Image Shop</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.image ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="image-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
  
                    <TextInput
                      placeholder="Enter URL Image"
                      onFocus={() => {
                        setFieldTouched("image");
                      }}
                      onBlur={() => {
                        setFieldTouched("image", "");
                      }}
                      value={values.image}
                      onChangeText={handleChange("image")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.image && errors.image && (
                    <Text style={styles.errorMessage}>{errors.image}</Text>
                  )}
                </View>
  
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Coordinate Shop</Text>
                  <TouchableOpacity>
                    <View style={styles.inputWrapper(/* ... */)}>
                      <MaterialCommunityIcons
                        name="source-commit-start"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />
  
                      <TextInput
                        placeholder="Enter Street Address"
                        onFocus={() => {
                          setFieldTouched("coordinate");
                        }}
                        onBlur={() => {
                          setFieldTouched("coordinate", "");
                        }}
                        value={values.coordinate}
                        onChangeText={(text) => {
                          handleChange("coordinate")(text);
                          handleCoordinateInput(text);
                        }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                      />
                    </View>
                  </TouchableOpacity>
                  {latitude !== null && longitude !== null && (
                    <Text>
                      Latitude: {latitude}, Longitude: {longitude}
                    </Text>
                  )}
                  {touched.coordinate && errors.coordinate && (
                    <Text style={styles.errorMessage}>{errors.coordinate}</Text>
                  )}
                </View>
  
                <Button
                  title={"S I G N U P"}
                  onPress={isValid ? handleSubmit : inValidForm}
                  loader={loader}
                  isValid={isValid}
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    );
  };
  
  export default RegisterShop;
  