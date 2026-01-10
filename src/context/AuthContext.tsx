// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { login as loginService, logout as logoutService } from "../services/auth";
// import { getAccessToken } from "../utils/storage";
// import api from "../services/api"; // ensure this is your axios instance or similar

// export interface User {
//   id: number;
//   its_number: string;
//   name: string;
//   role?: string | null;
// }

// interface AuthContextType {
//   token: string | null;
//   role: string | null;
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   login: (its_number: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [token, setToken] = useState<string | null>(getAccessToken());
//   const [role, setRole] = useState<string | null>(null);
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   useEffect(() => {
//     let mounted = true;
//     const controller = new AbortController();

//     async function fetchProfileIfNeeded() {
//       const existingToken = getAccessToken();
//       if (!existingToken) return;

//       // set token in state if not already set
//       if (!token) setToken(existingToken);

//       try {
//         // replace '/api/v1/auth/profile/' with your actual profile endpoint if different
//         const res = await api.get("/api/v1/auth/profile/", {
//           headers: { Authorization: `Bearer ${existingToken}` },
//           signal: controller.signal,
//         });

//         if (!mounted) return;

//         const profile = res.data;
//         // normalize profile fields to match User interface
//         setUser({
//           id: profile.id,
//           its_number: profile.its_number ?? profile.username ?? "",
//           name: profile.name ?? profile.full_name ?? "",
//           role: profile.role ?? null,
//         });
//         setRole(profile.role ?? null);
//       } catch (err) {
//         // if profile fetch fails, clear user but keep token so user can re-auth or login again
//         if (!mounted) return;
//         console.warn("Failed to fetch profile", err);
//         setUser(null);
//         setRole(null);
//       }
//     }

//     fetchProfileIfNeeded();

//     return () => {
//       mounted = false;
//       controller.abort();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // run once on mount

//   const login = async (its_number: string, password: string) => {
//     setIsLoading(true);
//     try {
//       const data = await loginService(its_number, password);
//       setToken(data.access);
//       setRole(data.role);

//       setUser({
//         id: data.id,
//         its_number,
//         name: data.name,
//         role: data.role,
//       });
//     } catch (error: any) {
//       throw new Error(error.message || "Login failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const logout = () => {
//     logoutService();
//     setToken(null);
//     setRole(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         token,
//         role,
//         user,
//         isAuthenticated: !!token,
//         isLoading,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

import { UserRole } from "@/lib/auth"; // centralize UserRole here
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login as loginService, logout as logoutService } from "../services/auth";
import {
  getAccessToken,
  setAccessToken,
  clearTokens,
  setRefreshToken,
} from "../utils/storage";
import api from "../services/api"; // axios instance

export interface User {
  id: number;
  its_number: string;
  name: string;
  role: UserRole | null;
  avatarUrl?: string | null;   // ✅ add avatar
}

interface AuthContextType {
  token: string | null;
  role: UserRole | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (its_number: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(getAccessToken());
  const [role, setRole] = useState<UserRole | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Attach token to axios instance whenever it changes
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function fetchProfileIfNeeded() {
      const existingToken = getAccessToken();
      if (!existingToken) return;

      if (!token) setToken(existingToken);

      try {
        const res = await api.get("/api/v1/auth/profile/", {
          signal: controller.signal,
        });

        if (!mounted) return;

        const profile = res.data;
        setUser({
          id: profile.id,
          its_number: profile.its_number ?? profile.username ?? "",
          name: profile.name ?? profile.full_name ?? "",
          role: profile.role as UserRole ?? null, // cast to UserRole
        });
        setRole(profile.role as UserRole ?? null);
      } catch (err) {
        if (!mounted) return;
        console.warn("Failed to fetch profile", err);
        setUser(null);
        setRole(null);
      }
    }

    fetchProfileIfNeeded();

    return () => {
      mounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (its_number: string, password: string) => {
    setIsLoading(true);
    try {
      const data = await loginService(its_number, password);
      setToken(data.access);
      setAccessToken(data.access);
      setRefreshToken(data.refresh);
      setRole(data.role as UserRole);

      setUser({
        id: data.id,
        its_number,
        name: data.name,
        role: data.role as UserRole,
      });
    } catch (error: any) {
      throw new Error(error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutService();
    clearTokens();
    setToken(null);
    setRole(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        user,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
