import { useState, useEffect } from "react";
import api from "../services/api";

const useFetch = (url, slug = null) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        let response;
        if (slug) {
          response = await api.get(`${url}/${slug}`);
        } else {
          response = await api.get(url);
        }

        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [url, slug]);

  return { data, isLoading };
};

export default useFetch;
