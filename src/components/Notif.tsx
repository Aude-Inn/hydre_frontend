
import { useEffect, useState, useRef } from "react";
import socket from "../utils/socket";
import type { ServerToClientEvents, ClientToServerEvents } from "../utils/socket";
import type { Socket } from "socket.io-client";
import { fetchValidNotifications } from "../services/NotifService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Heart } from "lucide-react";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { GameNotificationData } from "../types/socket.types";

export function Notifications() {
  const [notifications, setNotifications] = useState<GameNotificationData[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cast du socket avec les types corrects
  const typedSocket = socket as Socket<ServerToClientEvents, ClientToServerEvents>;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const notificationsFromApi = await fetchValidNotifications();
        if (isMounted) {
          setNotifications(notificationsFromApi);
        }
      } catch (error) {
        console.error("[Client] Erreur lors de la récupération des notifications :", error);
      }
    })();

    const handleGameNotification = (data: GameNotificationData) => {
      if (data?.name && data?.timestamp) {
        setNotifications((prev) => [data, ...prev]);
        toast.info(`💜 Nouveau jeu ajouté : ${data.name}`);
      }
    };

    typedSocket.on("game_notification", handleGameNotification);

    return () => {
      isMounted = false;
      typedSocket.off("game_notification", handleGameNotification);
    };
  }, [typedSocket]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative z-50 p-2 text-pink-400 hover:text-pink-500 transition"
        aria-label="Afficher les notifications"
      >
        <Heart className="w-6 h-6" />
      </button>

      {isOpen && <NotificationsDropdown notifications={notifications} />}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

