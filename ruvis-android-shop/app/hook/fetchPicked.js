import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const fetchPicked = (status) => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState(null);
  const [isOrdersLoading, setOrderLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.navigate("login");
      return;
    }
    const data = await AsyncStorage.getItem("driver");
    const driver = JSON.parse(data);
    const accessToken = JSON.parse(token);
    setOrderLoading(true);
    const endpoint = `http://10.0.2.2:6002/api/orders/picked/${status}/${driver._id}`;

    try {
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setOrders(response.data.data);
      setOrderLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setOrderLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setOrderLoading(true);
    fetchData();
  };

  return { orders, isOrdersLoading, error, refetch };
};

export default fetchPicked;
