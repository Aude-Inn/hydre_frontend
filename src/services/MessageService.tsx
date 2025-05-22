import axios from "axios";
import { MessageData } from "../types/socket.types";
import { API_ENDPOINTS } from "../utils/apiConfig";

// delete
export const deleteMessage = async (messageId: string): Promise<void> => {
  try {
    const response = await axios.delete(API_ENDPOINTS.messageById(messageId));
    if (response.status !== 200 && response.status !== 204) {
      console.warn("Réponse inattendue :", response.status);
    }
  } catch (error) {
    console.error("Erreur suppression :", error);
    throw error;
  }
};

// all 
export const fetchMessages = async (): Promise<MessageData[]> => {
  try {
    const response = await axios.get(API_ENDPOINTS.messages);
    return response.data;
  } catch (error) {
    console.error("Erreur récupération messages :", error);
    throw error;
  }
};
