import axios from "axios";
import store from "../redux/index";

const axiosInstance = axios.create({
  baseURL: "http://www.actore.store/"
});

axiosInstance.interceptors.request.use((config) => {
  const { accessToken } = store.getState().auth;

  if (accessToken != null) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default axiosInstance;
