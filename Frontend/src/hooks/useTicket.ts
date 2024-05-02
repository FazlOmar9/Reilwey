import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const useTicket = (userId: number, trainId: number, tier: string, book: boolean) => {
  const [ticket, setTicket] = useState<number>(0);

  useEffect(() => {
    if(book) {
      apiClient.post("/tickets", {
          user_id: userId,
          train_id: trainId,
          tier: tier
      })
        .then(res => {
          res.status == 200 ? setTicket(1) : setTicket(0);
        })
        .catch(err => {
          console.log(err);
          setTicket(0);
        });
    }
  }, [book])

  return ticket;  
}

export default useTicket;