import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../types/user.type";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);

  // Récupérer l'utilisateur et le token depuis localStorage lors du montage du composant
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
          setToken(storedToken);  // Mettre à jour l'état avec le token depuis localStorage
        }
      } catch (error) {
        console.error(
          "Erreur lors du parsing des données utilisateur depuis localStorage:",
          error
        );
      }
    }
  }, []);

  // Fonction pour la connexion de l'utilisateur
  const login = (user: User, token: string): void => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);  // Enregistrer le token dans localStorage
    setUser(user);
    setToken(token);  // Mettre à jour l'état avec le nouveau token
  };

  // Fonction pour la déconnexion
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);  // Réinitialiser le token dans l'état
  };

  // Fonction pour mettre à jour le nom de l'utilisateur
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
