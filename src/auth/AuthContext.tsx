import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type AuthUser = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  register: (input: RegisterInput) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || "https://mock.economiza.ai";
const CURRENT_USER_KEY = "auth_user";
const AUTH_TOKEN_KEY = "auth_token";

function getCurrentUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

function setCurrentUser(user: AuthUser | null) {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

function getToken(): string | null {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

function setToken(token: string | null) {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  }
}

async function request(path: string, init?: RequestInit, token?: string | null) {
  const headers: HeadersInit = {
    ...(init?.headers || {}),
  };
  if (!("Content-Type" in headers)) {
    headers["Content-Type"] = "application/json";
  }
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getCurrentUser());
  const [token, setTokenState] = useState<string | null>(() => getToken());

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  useEffect(() => {
    setToken(token);
  }, [token]);

  useEffect(() => {
    const bootstrap = async () => {
      if (token && !user) {
        try {
          const data = await request("/auth/me", { method: "GET" }, token);
          if (data && data.user) {
            setUser({ name: data.user.name, email: data.user.email });
          }
        } catch {
        }
      }
    };
    bootstrap();
  }, [token]);

  const register = async (input: RegisterInput) => {
    try {
      const data = await request("/auth/register", {
        method: "POST",
        body: JSON.stringify(input),
      }, null);
      if (data && data.token) {
        setTokenState(data.token as string);
      }
      if (data && data.user) {
        setUser({ name: data.user.name, email: data.user.email });
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      }, null);
      if (data && data.token) {
        setTokenState(data.token as string);
      }
      if (data && data.user) {
        setUser({ name: data.user.name, email: data.user.email });
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await request("/auth/logout", { method: "POST" }, token);
    } catch {
    } finally {
      setTokenState(null);
      setUser(null);
    }
  };

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: !!token,
    register,
    login,
    logout,
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}