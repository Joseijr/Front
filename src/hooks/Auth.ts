import { useCallback, useEffect, useState } from "react";

export interface AuthUser {
  id: string;
  carnet: string;
  username: string;
  created_at: string;
}

interface RegisterResponse {
  message: string;
  token: string;
  user: AuthUser;
}

interface LoginResponse {
  message: string;
  token: string;
  user: AuthUser;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api/auth";

function normalizeToken(token: string | null | undefined) {
  if (!token) return null;
  const trimmed = token.trim();
  if (!trimmed || trimmed === "null" || trimmed === "undefined") return null;
  return trimmed;
}

function saveAuthSession(token: string, user?: AuthUser | null) {
  const normalizedToken = normalizeToken(token);
  if (!normalizedToken) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    return;
  }

  localStorage.setItem("authToken", normalizedToken);
  if (user) {
    localStorage.setItem("authUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("authUser");
  }
}

function clearAuthSession() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");
    const validToken = savedToken && savedToken !== "null" && savedToken !== "undefined" ? savedToken : null;

    if (validToken && savedUser) {
      setToken(validToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        clearAuthSession();
      }
    } else {
      clearAuthSession();
    }
  }, []);

  const register = useCallback(
    async (username: string, carnet: string, password: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_BASE}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            carnet,
            username,
            password,
          }),
        });

        const result = (await response.json()) as RegisterResponse;

        console.log("Register API response", response.status, result);

        if (!response.ok || !result.token || !result.user) {
          const message = result?.message || "Error en el registro";
          throw new Error(message);
        }

        saveAuthSession(result.token, result.user);
        setUser(result.user);
        setToken(result.token);

        return result;
      } catch (err) {
        console.error("Register API error:", err);
        const message = err instanceof Error ? err.message : "Error en el registro";
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const login = useCallback(async (carnet: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Login API request", { carnet, password: password ? "[REDACTED]" : "" });
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ carnet, password }),
      });

      const result = (await response.json()) as LoginResponse;

      if (!response.ok || !result.token || !result.user) {
        throw new Error(result.message || "Error en el inicio de sesión");
      }

      saveAuthSession(result.token, result.user);
      setUser(result.user);
      setToken(result.token);

      return result;
    } catch (err) {
      console.error("Login API error:", err);
      const message = err instanceof Error ? err.message : "Error en el inicio de sesión";
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearAuthSession();
    setUser(null);
    setToken(null);
  }, []);

  return {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
  };
}
