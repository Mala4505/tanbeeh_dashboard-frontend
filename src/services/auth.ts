import api from "./api";
import { setAccessToken, setRefreshToken, clearTokens } from "../utils/storage";

export interface LoginResponse {
  access: string;
  refresh: string;   // <-- add this
  role: string;
  id: number;
  its_number: string;
  name: string;
}

/**
 * Login with ITS number and password
 */
export async function login(its_number: string, password: string): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/api/v1/auth/token/", {
    its_number,
    password,
  });
  const data = response.data;
  if (data.access) {
    setAccessToken(data.access);
  }
  if (data.refresh) {
    setRefreshToken(data.refresh);
  }
  return data;
}

/**
 * Refresh access token
 */
export async function refresh(): Promise<string | null> {
  try {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) return null;

    const response = await api.post<{ access: string }>("/api/v1/auth/refresh/", {
      refresh: refreshToken,
    });
    const newAccess = response.data.access;
    if (newAccess) {
      setAccessToken(newAccess);
      return newAccess;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Logout: clear tokens
 */
export function logout(): void {
  clearTokens();
  // optionally call backend logout endpoint
  // api.post("/api/v1/auth/logout/", {});
}
