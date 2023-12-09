import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Switch,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, SIZES } from "../constants/theme";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  address: Yup.string()
    .min(3, "address must be at least 3 characters")
    .required("Required"),

  district: Yup.string()
    .min(3, "district must be at least 3 characters")
    .required("Required"),

  city: Yup.string()
    .min(3, "city must be at least 3 characters")
    .required("Required"),

  postalCode: Yup.string()
    .min(3, "postalCode must be at least 3 characters")
    .required("Required"),

  state: Yup.string()
    .min(3, "state must be at least 3 characters")
    .required("Required"),

  country: Yup.string()
    .min(3, "country must be at least 3 characters")
    .required("Required"),

  deliveryInstructions: Yup.string()
    .min(3, "deliveryInstructions must be at least 3 characters")
    .required("Required"),
});

const AddressPage = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(true);

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

  const addAddress = async (values) => {
    setLoader(true);
    const token = await AsyncStorage.getItem("token");
    const accessToken = JSON.parse(token);

    try {
      const endpoint = "http://10.0.2.2:6002/api/address";
      const data = {
        addressLine1: values.address,
        city: values.city,
        district: values.district,
        state: values.state,
        postalCode: values.postalCode,
        default: defaultAddress,
        country: values.country,
        deliveryInstructions: values.deliveryInstructions,
      };

      const response = await axios.post(endpoint, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 201) {
        setLoader(false);
        navigation.navigate('bottom-navigation');
      } else {
        Alert.alert("Error Adding an address ", "Please provide valid credentials ", [
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
      setLogin(false);
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

  return (
    <View style={{ backgroundColor: COLORS.offwhite, flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircle" color={COLORS.primary} size={26} />
        </TouchableOpacity>
        <View style={{ width: SIZES.width / 3.8 }} />
        <Text style={styles.headingText}>Add Address</Text>
      </View>

      <View style={{ height: 20 }} />

      <ScrollView style={{ backgroundColor: COLORS.white }}>
        <View style={{ marginHorizontal: 20, marginTop: 50 }}>
          <Formik
            initialValues={{
              address: "",
              district: "",
              city: "",
              postalCode: "",
              state: "",
              country: "",
              deliveryInstructions: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => addAddress(values)}
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
                  <View
                    style={styles.inputWrapper(
                      touched.address ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <TextInput
                      placeholder="Address"
                      onFocus={() => {
                        setFieldTouched("address");
                      }}
                      onBlur={() => {
                        setFieldTouched("address", "");
                      }}
                      value={values.address}
                      onChangeText={handleChange("address")}
                      placeholderTextColor={COLORS.gray}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.address && errors.address && (
                    <Text style={styles.errorMessage}>{errors.address}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <View
                    style={styles.inputWrapper(
                      touched.district ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <TextInput
                      placeholder="District"
                      onFocus={() => {
                        setFieldTouched("district");
                      }}
                      onBlur={() => {
                        setFieldTouched("district", "");
                      }}
                      value={values.district}
                      placeholderTextColor={COLORS.gray}
                      onChangeText={handleChange("district")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.district && errors.district && (
                    <Text style={styles.errorMessage}>{errors.district}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <View
                    style={styles.inputWrapper(
                      touched.city ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <TextInput
                      placeholder="City"
                      onFocus={() => {
                        setFieldTouched("city");
                      }}
                      onBlur={() => {
                        setFieldTouched("city", "");
                      }}
                      value={values.city}
                      onChangeText={handleChange("city")}
                      placeholderTextColor={COLORS.gray}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.city && errors.city && (
                    <Text style={styles.errorMessage}>{errors.city}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <View
                    style={styles.inputWrapper(
                      touched.postalCode ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <TextInput
                      placeholder="Postal Code"
                      onFocus={() => {
                        setFieldTouched("postalCode");
                      }}
                      onBlur={() => {
                        setFieldTouched("postalCode", "");
                      }}
                      value={values.postalCode}
                      onChangeText={handleChange("postalCode")}
                      placeholderTextColor={COLORS.gray}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.postalCode && errors.postalCode && (
                    <Text style={styles.errorMessage}>{errors.postalCode}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <View
                    style={styles.inputWrapper(
                      touched.state ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <TextInput
                      placeholder="State"
                      onFocus={() => {
                        setFieldTouched("state");
                      }}
                      onBlur={() => {
                        setFieldTouched("state", "");
                      }}
                      value={values.state}
                      onChangeText={handleChange("state")}
                      placeholderTextColor={COLORS.gray}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.state && errors.state && (
                    <Text style={styles.errorMessage}>{errors.state}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <View
                    style={styles.inputWrapper(
                      touched.country ? COLORS.secondary : COLORS.offwhite
                    )}
                  >
                    <TextInput
                      placeholder=" Country"
                      onFocus={() => {
                        setFieldTouched("country");
                      }}
                      onBlur={() => {
                        setFieldTouched("country", "");
                      }}
                      value={values.country}
                      onChangeText={handleChange("country")}
                      placeholderTextColor={COLORS.gray}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.country && errors.country && (
                    <Text style={styles.errorMessage}>{errors.country}</Text>
                  )}
                </View>

                <View style={styles.wrapper}>
                  <View
                    style={styles.inputWrapper(
                      touched.deliveryInstructions
                        ? COLORS.secondary
                        : COLORS.offwhite
                    )}
                  >
                    <TextInput
                      placeholder=" Delivery Instructions"
                      onFocus={() => {
                        setFieldTouched("deliveryInstructions");
                      }}
                      onBlur={() => {
                        setFieldTouched("deliveryInstructions", "");
                      }}
                      value={values.deliveryInstructions}
                      onChangeText={handleChange("deliveryInstructions")}
                      placeholderTextColor={COLORS.gray}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.deliveryInstructions &&
                    errors.deliveryInstructions && (
                      <Text style={styles.errorMessage}>
                        {errors.deliveryInstructions}
                      </Text>
                    )}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontFamily: "regular", fontSize:15 }}
                  >
                    Set as default address
                  </Text>
                  <Switch
                    trackColor={{ false: COLORS.gray2, true: COLORS.gray2 }}
                    thumbColor={
                      defaultAddress ? COLORS.secondary : COLORS.primary
                    }
                    ios_backgroundColor={COLORS.gray2}
                    onValueChange={() => {
                      setDefaultAddress(!defaultAddress);
                    }}
                    value={defaultAddress}
                  />
                </View>

                <Button
                  loader={loader}
                  title={"S U B M I T"}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddressPage;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.lightWhite,
    width: SIZES.width,
    height: 110,
    paddingTop: 70,
    paddingHorizontal: 20,
    flexDirection: "row",
    borderColor: COLORS.gray2,
    borderWidth: 0.2,
  },
  headingText: {
    fontFamily: "medium",
    fontSize: 16,
    paddingTop: 4,
  },

  cover: {
    height: SIZES.height / 2.4,
    width: SIZES.width,
    marginBottom: SIZES.xxLarge,
  },

  wrapper: {
    marginBottom: 10,
  },
  inputWrapper: (borderColor) => ({
    borderColor: COLORS.gray2,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    height: 45,
    flexDirection: "row",
    alignItems: "center",
  }),
  iconStyle: {
    marginRight: 10,
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: "regular",
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },
});
