import axios from "axios";
import { API_ENDPOINTS } from "../utils/apiConfig";
import { User } from "../types/user.type";

function getAuthConfig() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token manquant, utilisateur non autorisé.");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function getUsers(): Promise<User[]> {
  try {
    const config = getAuthConfig();
    const response = await axios.get(API_ENDPOINTS.users, config);
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
  try {
    const config = getAuthConfig();
    const response = await axios.delete(API_ENDPOINTS.userById(id), config);
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
    const response = await axios.post(API_ENDPOINTS.authLogin, { email, password });
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

export async function updateUserById(
  id: string,
  updatedData: { name: string; email: string; role: string }
): Promise<User> {
  try {
    const config = getAuthConfig();
    const response = await axios.put(API_ENDPOINTS.userById(id), updatedData, config);
    if (response.status === 200 && response.data.user) {
      return response.data.user;
    } else {
      throw new Error("Échec de la mise à jour de l'utilisateur.");
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
    throw error;
  }
}
