import { useState, useEffect } from "react";

export function useFetch(url, adaptor) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      return;
    }

    let ignore = false;

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (ignore) return;
        const formatted = adaptor ? adaptor(json) : json;
        setData(formatted);
      })
      .catch(() => {
        if (!ignore) setData(null);
      });

    return () => {
      ignore = true;
    };
  }, [url, adaptor]);

  return data;
}
