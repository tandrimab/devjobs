import { useEffect, useState } from "react";

export default function useFetch(url, requestOptions, fetchData) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const controller = new AbortController();
    async function fetchAPI() {
      setLoading(true);
      const signal = controller.signal;
      try {
        const response = await fetch(url, requestOptions, { signal });
        const data = await response.json();
        setData(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    if (fetchData) {
      fetchAPI();
    }
    return () => {
      controller.abort();
    };
  }, [fetchData]);

  return { data, loading, error };
}
