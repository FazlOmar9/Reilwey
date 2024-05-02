import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const useFilters = (query: string) => {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    apiClient.get(`/filters/${query}`, {})
      .then((res) => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return { data };
}

export default useFilters;