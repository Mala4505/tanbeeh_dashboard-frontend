// src/services/auth.ts
import api from "./api";
import { setAccessToken, clearAccessToken } from "../utils/storage";


export interface LoginResponse {
  access: string;
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
  return data;
}

/**
 * Refresh access token
 */
export async function refresh(): Promise<string | null> {
  try {
    const response = await api.post<{ access: string }>("/api/v1/auth/refresh/", {});
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
 * Logout: clear token and optionally call backend if needed
 */
export function logout(): void {
  clearAccessToken();
  // If backend has a logout/blacklist endpoint, call it here
  // api.post("/api/v1/auth/logout/", {});
}
