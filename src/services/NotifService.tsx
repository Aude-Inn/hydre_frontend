import axios from "axios";
import { GameNotificationData } from "../types/socket.types";
import { API_ENDPOINTS } from "../utils/apiConfig";

// Supprimer les notif 5j
export const cleanExpiredNotifications = (notifications: GameNotificationData[]): GameNotificationData[] => {
  const fiveDaysAgo = Date.now() - 5 * 24 * 60 * 60 * 1000; 
  return notifications.filter((notification) => {
    const notificationTime = new Date(notification.addedAt).getTime();
    return notificationTime >= fiveDaysAgo;
  });
};

// Récupérer les notifications 
export const fetchValidNotifications = async (): Promise<GameNotificationData[]> => {
  try {
    const response = await axios.get<GameNotificationData[]>(API_ENDPOINTS.notifs);
    const validNotifications = response.data.filter(
      (notif) => notif.name && notif.addedAt
    );

    return cleanExpiredNotifications(validNotifications).slice(0, 5);
  } catch (error) {
    console.error("Erreur lors de la récupération des notifications :", error);
    throw error;
  }
};
