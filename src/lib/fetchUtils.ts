import axiosInstance from "@/lib/axiosInstance";

export const fetchData = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  body?: any
) => {
  try {
    switch (method) {
      case "POST":
        return await axiosInstance.post(url, body);
      case "PUT":
        return await axiosInstance.put(url, body);
      case "PATCH":
        return await axiosInstance.patch(url, body);
      case "DELETE":
        return await axiosInstance.delete(url);
      default:
        return await axiosInstance.get(url);
    }
  } catch (error) {
    console.error(`Error during fetch (${method}) for ${url}:`, error);
    throw error; // Rethrow to handle it in calling functions
  }
};
