import { useState, useEffect } from "react";
import axios from "axios";

function useFetch(url, count = 0) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const run = async () => {
      try {
        if (count > 1) {
          const mealPromises = Array(count)
            .fill(null)
            .map(() => axios.get(url));
          const responses = await Promise.all(mealPromises);
          if (!active) return;
          setData(responses.map((res) => res.data));
        } else {
          const res = await axios.get(url);
          if (!active) return;
          setData(res.data);
        }
      } catch (err) {
        if (active) setError(err);
      } finally {
        if (active) setLoading(false);
      }
    };
    run();
    return () => {
      active = false;
    };
  }, [url, count]);

  return { data, loading, error };
}

export default useFetch;
