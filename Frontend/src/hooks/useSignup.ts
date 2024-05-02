import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { FormData } from "../components/login/SignupForm";

const useSignup = (data: FormData, deps?: any[]) => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    if (data.name && data.email && data.password){
      apiClient.post("/register", {...data}, { signal: abortController.signal })
        .then((res) => {
          setUserId(res.data.id);
        })
        .catch(err => {
          console.log(err);
          setUserId(-1);
        })
    }
    return () => {
      abortController.abort();
    };
  }, deps ? deps : []);

  return userId;
}

export default useSignup;