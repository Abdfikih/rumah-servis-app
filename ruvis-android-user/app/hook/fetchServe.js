import { useState, useEffect } from "react";
import axios from "axios";

const fetchserve = (serveId)=> {
    const [serve,setserve ] = useState(null)
    const [isLoading, setIsLoading ] = useState(false)
    const [error, setError ] = useState(null)

    const fetchData = async ()=> {
        setIsLoading(true)

        try {
            const response = await axios.get(`http://10.0.2.2:6002/api/serves/${serveId}`)
            setserve(response.data);

            setIsLoading(false);
        } catch (error) {
            setError(error)
        }finally{
            setIsLoading(false);
        }
    }


    useEffect(()=> {
        fetchData();
    }, [])

    const refetch = ()=> {
        setIsLoading(true);
        fetchData();
    }

    return {serve, isLoading, error, refetch}
}

export default fetchserve