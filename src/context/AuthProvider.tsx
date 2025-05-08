import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../types/user.type";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);

 
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
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
          setToken(storedToken); 
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
    setToken(token); 
  };


  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);  
  };

 
  const updateUserName = (newName: string) => {
    if (user) {
      const updatedUser = { ...user, name: newName };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUserName }}>
      {children}
    </AuthContext.Provider>
  );
};
