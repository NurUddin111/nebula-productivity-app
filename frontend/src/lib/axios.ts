import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:1126/api/v1",
  withCredentials: true,
});
