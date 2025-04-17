import axios from 'axios';


const API_URL = 'http://localhost:5000';

// réinitialisation de mot de passe
export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const response = await axios.post(`${API_URL}/forgot-password`, { email });
  return response.data;
};

// Réinitialisation avec token
export const resetPassword = async (token: string, password: string): Promise<{ message: string }> => {
  const response = await axios.post(`${API_URL}/reset-password`, { token, password });
  return response.data;
};