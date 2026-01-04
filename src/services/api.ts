// src/services/api.ts
import axios, { AxiosError, AxiosInstance } from "axios";
import { API_BASE_URL } from "../config/env";
import { getAccessToken, setAccessToken, clearAccessToken } from "../utils/storage";

// Create Axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach token
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      // ensure headers object exists and set Authorization safely
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle errors & refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    // If unauthorized, try refresh once
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/api/v1/auth/refresh/`,
          {},
          { withCredentials: true }
        );
        const newAccess = (refreshResponse.data as any)?.access;
        if (newAccess) {
          setAccessToken(newAccess);
          // ensure originalRequest.headers exists before setting
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        clearAccessToken();
        // redirect to login if refresh fails
        window.location.href = "/login";
      }
    }

    // Normalize error
    const message =
      (error.response?.data as any)?.detail ||
      (error.response?.data as any)?.message ||
      error.message ||
      "An unexpected error occurred";

    return Promise.reject({ ...error, message });
  }
);

export default api;
