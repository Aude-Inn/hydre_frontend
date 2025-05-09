import axios from "axios";
import { User } from "../types/user.type";


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


const url = `${API_URL}/allUsers`;
const urlDelete = `${API_URL}/user/`;
const urlLogin = `${API_URL}/login`;

export async function getUsers(): Promise<User[]> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token manquant, utilisateur non autorisé.");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(url, config);
    if (Array.isArray(response.data.users)) {
      return response.data.users;
    } else {
      throw new Error("Format des données incorrect.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    throw error;
  }
}

export async function deleteUser(id: string): Promise<void> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token manquant, utilisateur non autorisé.");
  }
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.delete(`${urlDelete}${id}`, config);
    if (response.status === 200) {
      console.log("Utilisateur supprimé:", id);
    } else {
      console.error("Échec de la suppression de l'utilisateur:", id);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    throw error;
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ token: string; user: User }> {
  try {
    const response = await axios.post(urlLogin, { email, password });
    const { token, user } = response.data;
    if (!token || !user) {
      throw new Error("Les données de connexion sont incorrectes.");
    }

    localStorage.setItem("token", token);
  
    return { token, user };
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw new Error("Échec de la connexion.");
  }
}

export async function updateUser(
  updatedData: { name: string; email: string; role: string }
): Promise<User> {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token manquant, utilisateur non autorisé.");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // Change l'URL ici pour correspondre à la route PUT du backend
    const response = await axios.put(`${API_URL}/updateUser`, updatedData, config);

    if (response.status === 200 && response.data.user) {
      console.log("Utilisateur mis à jour:", response.data.user);
      return response.data.user; 
    } else {
      throw new Error("Échec de la mise à jour de l'utilisateur.");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    throw error;
  }
}
