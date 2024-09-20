import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance"; // Import your axios instance
import { AxiosRequestConfig } from "axios";

interface FetchOptions extends AxiosRequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
}

const useFetch = (url: string, options?: FetchOptions) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response;
        switch (options?.method) {
          case "POST":
            response = await axiosInstance.post(url, options?.body);
            break;
          case "PUT":
            response = await axiosInstance.put(url, options?.body);
            break;
          case "DELETE":
            response = await axiosInstance.delete(url);
            break;
          default:
            response = await axiosInstance.get(url);
        }
        setData(response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, error, loading };
};

export default useFetch;
