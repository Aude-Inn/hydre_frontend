import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// réinitialisation de mot de passe
export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const response = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
  return response.data;
};

// Réinitialisation avec token
export const resetPassword = async (token: string, password: string): Promise<{ message: string }> => {
  const response = await axios.post(`${API_URL}/api/auth/reset-password/${token}`, { password });
  return response.data;
};