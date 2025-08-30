import axios from "axios";

// Set baseURL from environment variable
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
//const baseURL = "http://localhost:5000/api";

// console.log("Base URL:", baseURL);

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    // Add additional headers like Authorization if needed
    // Authorization: `Bearer ${yourToken}`
  },
});

export default axiosInstance;
