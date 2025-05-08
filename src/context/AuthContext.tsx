import { createContext } from "react";
import { User } from "../types/user.type";

interface AuthContextProps {
  user: User | null;
  token: string | null; 
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUserName: (newName: string) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);
