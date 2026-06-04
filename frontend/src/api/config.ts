import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const userInfoString = localStorage.getItem("user-info");
    if (userInfoString) {
      try {
        const userInfo = JSON.parse(userInfoString);
        if (userInfo && userInfo.token) {
          config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
      } catch (error) {
        console.error("Error parsing user-info from localStorage", error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
