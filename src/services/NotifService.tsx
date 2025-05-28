import axios from "axios";
import { GameNotificationData } from "../types/socket.types";
import { API_ENDPOINTS } from "../utils/apiConfig";


// Récup les notif
export const fetchValidNotifications = async (): Promise<GameNotificationData[]> => {
  try {
    const response = await axios.get<GameNotificationData[]>(API_ENDPOINTS.notifs);
    const validNotifications = response.data.filter(
      (notif) => notif.name && notif.timestamp
    );

    return validNotifications.slice(0, 5); 
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications :", error);
    throw error;
  }
};
