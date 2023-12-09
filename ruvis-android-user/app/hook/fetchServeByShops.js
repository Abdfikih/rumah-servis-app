import { useState, useEffect } from "react";
import axios from "axios";

const fetchserveByShop = (shopId, code) => {
  const [serveList, setserveList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `http://10.0.2.2:6002/api/serves/shop/${shopId}`
      );
      setserveList(response.data);

      if (response.data.length === 0) {
        const response = await axios.get(
          `http://10.0.2.2:6002/api/serves/recommendation/${code}`
        );
        setserveList(response.data);
      }
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

  return { serveList, isLoading, error, refetch };
};

export default fetchserveByShop;
