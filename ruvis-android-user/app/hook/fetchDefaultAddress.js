import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultAddress } from "../context/DefaultAddress";

const fetchDefaultAddress = () => {
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { defaultAd, setDefaultAd } = useContext(DefaultAddress);


   

    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        const accessToken = JSON.parse(token)
        setIsLoading(true);

        try {
            const response = await axios.get(`http://10.0.2.2:6002/api/address/default`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            
            
            setDefaultAddress(response.data)
            setDefaultAd(response.data)
            setIsLoading(false);
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])


    const refetch =() => {
        setDefaultAddress(true);
        fetchData();
    }

    return {defaultAddress, isLoading, error, refetch}
}

export default fetchDefaultAddress