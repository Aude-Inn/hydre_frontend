import axios from "axios";
import { MessageData } from "../types/socket.types"; 

const API_URL = "http://localhost:5000/messages"; 

// delete
export const deleteMessage = async (messageId: string): Promise<void> => {
  try {
    const response = await axios.delete(`${API_URL}/${messageId}`);
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

// fetch des messages
export const fetchMessages = async (): Promise<MessageData[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des messages :", error);
    throw error;
  }
};
