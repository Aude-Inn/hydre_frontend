import axios from "axios";
import { API_ENDPOINTS } from "../utils/apiConfig";

// API
const BASE_URL = API_ENDPOINTS

// delete
export const deleteMessage = async (messageId: string): Promise<void> => {
  try {
    const response = await axios.delete(BASE_URL.messageById(messageId));
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

