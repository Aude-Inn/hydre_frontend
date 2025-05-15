import axios from "axios";
import { MessageData } from "../types/socket.types"; 
import { API_ENDPOINTS } from "../utils/apiConfig";

// Delete
export const deleteMessage = async (messageId: string): Promise<void> => {
  try {
    const response = await axios.delete(API_ENDPOINTS.messageById(messageId));
    if (response.status === 200 || response.status === 204) {
      console.log(`Message ${messageId} supprimé avec succès`);
    } else {
      console.warn(`Suppression réussie mais réponse inattendue :`, response.status);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    throw error; 
  }
};

// Messages
export const fetchMessages = async (): Promise<MessageData[]> => {
  try {
    const response = await axios.get(API_ENDPOINTS.messages);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des messages :", error);
    throw error;
  }
};