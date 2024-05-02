import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { FormData } from "../components/login/LoginForm";

const useLogin = (data: FormData, onServerResponse: () => void, deps ?: any[]) => {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    if (data.email != '' && data.password != ''){
      apiClient.post("/login", {...data}, { signal: abortController.signal })
        .then((res) => {
          setUserId(res.data.id);
        })
        .catch(err => {
          console.log(err);
          setUserId(-1);
        })
        .finally(() => {
          onServerResponse();
        });
    }

    return () => {
      abortController.abort();
    };
  }, deps ? deps : []);

  return userId;
}

export default useLogin;