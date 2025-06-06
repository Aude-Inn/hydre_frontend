import axios from "axios";
import { API_ENDPOINTS } from "../utils/apiConfig";
import { RegisterPayload, RegisterResponse } from "../types/auth.type";

// API AUTH
const BASE_URL = API_ENDPOINTS.auth;

// Réinit MDP
export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  try {
    const response = await axios.post(`${BASE_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la demande de réinitialisation du mot de passe :", error);
    throw error;
  }
};

// Réinit MDP token
export const resetPassword = async (token: string, password: string): Promise<{ message: string }> => {
  try {
    const response = await axios.post(`${BASE_URL}/reset-password/${token}`, { password });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe :", error);
    throw error;
  }
};

// Register
export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, payload);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw error;
  }
};
