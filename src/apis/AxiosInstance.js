import axios from "axios";
import store from "../redux/index";

const axiosInstance = axios.create({
  baseURL: "http://www.actore.store/"
});

// Define a variable to keep track of the current access token
let currentAccessToken = null;

// Function to update the access token in the interceptor headers
const updateAccessToken = () => {
  const { accessToken } = store.getState().auth;
  if (accessToken !== currentAccessToken) {
    currentAccessToken = accessToken;
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
};

// Initial update of the access token
updateAccessToken();

// Subscribe to changes in the access token
store.subscribe(updateAccessToken);

export default axiosInstance;
