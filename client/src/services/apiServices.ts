import axios from "axios";
import { logout, refreshToken } from "./authService";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error (e.g., redirect to login page)
        console.error("Failed to refresh token:", refreshError);
        await logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
