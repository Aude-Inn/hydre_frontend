import axios from "axios";
import { GameNotificationData } from "../types/socket.types";

// Supprimer les notifications
export const cleanExpiredNotifications = (notifications: GameNotificationData[]): GameNotificationData[] => {
  const oneWeekAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
  return notifications.filter((notification) => {
    const notificationTime = new Date(notification.addedAt).getTime();
    return notificationTime >= oneWeekAgo;
  });
};

// Récupérer les notifications 
export const fetchValidNotifications = async (): Promise<GameNotificationData[]> => {
  const response = await axios.get<GameNotificationData[]>("http://localhost:5000/notifications");

  const validNotifications = response.data.filter(
    (notif) => notif.name && notif.addedAt
  );

  return cleanExpiredNotifications(validNotifications).slice(0, 10); 
};