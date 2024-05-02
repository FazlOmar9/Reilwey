import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

export interface Train {
  id: number;
  source: string;
  destination: string;
  day: [number];
  arrival_time: string;
  departure_time: string;
  availability: number;
}

const useTrains = (source: string, destination: string, deps ?: [any]) => {
  const [trains, setTrains] = useState<Train[]>([]);

  useEffect(() => {
    apiClient.get("/trains", {params:
      {source: source, destination: destination}
    })
      .then((res) => {
        setTrains(res.data.map((train: any) => {
          train.day = JSON.parse(train.day);
          return train;
        }));
      })
      .catch(err => {
        console.log(err);
        setTrains([]);
      });
  }, deps ? [...deps, source, destination] : [source, destination]);

  return { trains };
}

export default useTrains;