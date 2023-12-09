import { useState, useEffect } from "react";
import axios from "axios";

const fetchNearBy = () => {
  const [shops, setshops] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (code) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`http://10.0.2.2:6002/api/shop/${code}`);
      setshops(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { shops, isLoading, error, refetch };
};

export default fetchNearBy;
