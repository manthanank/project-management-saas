"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, USERS } from "@/lib/data";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  activeWorkspace: string;
  login: (email: string, name?: string, role?: User["role"]) => void;
  logout: () => void;
  switchUser: (userId: string) => void;
  switchWorkspace: (workspace: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  activeWorkspace: "Acme Corp / ENG-Core",
  login: () => {},
  logout: () => {},
  switchUser: () => {},
  switchWorkspace: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [activeWorkspace, setActiveWorkspace] = useState("Acme Corp / ENG-Core");

  useEffect(() => {
    const saved = localStorage.getItem("pulse_pm_session");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(USERS[0]);
      }
    } else {
      setUser(USERS[0]); // Alex Mercer (Owner) default
    }
  }, []);

  const login = (email: string, name?: string, role: User["role"] = "Member") => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: name || email.split("@")[0],
      email,
      role,
      avatar: USERS[0].avatar,
    };
    setUser(newUser);
    localStorage.setItem("pulse_pm_session", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pulse_pm_session");
  };

  const switchUser = (userId: string) => {
    const found = USERS.find((u) => u.id === userId);
    if (found) {
      setUser(found);
      localStorage.setItem("pulse_pm_session", JSON.stringify(found));
    }
  };

  const switchWorkspace = (ws: string) => {
    setActiveWorkspace(ws);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        activeWorkspace,
        login,
        logout,
        switchUser,
        switchWorkspace,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
