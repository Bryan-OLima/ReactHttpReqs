import { useState, useEffect } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const json = res.json();

      setData(json);
    };

    fetchData();
  }, [url]);
  return data;
};
