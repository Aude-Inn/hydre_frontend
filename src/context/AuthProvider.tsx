import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../types/user.type";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (
          parsedUser &&
          parsedUser._id &&
          parsedUser.email &&
          parsedUser.name &&
          parsedUser.role
        ) {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error(
          "Erreur lors du parsing des données utilisateur depuis localStorage:",
          error
        );
      }
    }
  }, []);

  const login = (user: User, token: string): void => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateUserName = (newName: string) => {
    if (user) {
      const updatedUser = { ...user, name: newName };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserName }}>
      {children}
    </AuthContext.Provider>
  );
};
