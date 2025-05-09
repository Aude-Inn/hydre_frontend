import axios from "axios";
import { User } from "../types/user.type";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


const urlGetAll = `${API_URL}/api/users`;
const urlLogin = `${API_URL}/api/auth/login`;
const urlUpdate = `${API_URL}/api/users/me`;
const urlUpdateById = (id: string) => `${API_URL}/api/users/${id}`;
const urlDelete = `${API_URL}/api/users/`; 

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
    const response = await axios.get(urlGetAll, config);
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
  try {
    const config = getAuthConfig();
    const response = await axios.put(urlUpdate, updatedData, config);
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

export async function updateUserById(
  id: string,
  updatedData: { name: string; email: string; role: string }
): Promise<User> {
  const config = getAuthConfig();
  const response = await axios.put(urlUpdateById(id), updatedData, config);
  if (response.status === 200 && response.data.user) {
    return response.data.user;
  } else {
    throw new Error("Échec de la mise à jour de l'utilisateur.");
  }
}
