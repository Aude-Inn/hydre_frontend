import { useEffect, useState, useRef } from "react";
import socket from "../utils/socket";
import { GameNotificationData } from "../types/socket.types";
import { fetchValidNotifications, cleanExpiredNotifications } from "../services/NotifService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Heart } from "lucide-react";
import { NotificationsDropdown } from "./NotificationsDropdown"; // Assure-toi du bon chemin

export function Notifications() {
  const [notifications, setNotifications] = useState<GameNotificationData[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);


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
        const cleaned = await fetchValidNotifications();
        if (isMounted) {
          setNotifications(cleaned);
        }
      } catch (error) {
        console.error("[Client] Erreur lors de la récupération des notifications :", error);
      }
    })();

    const handleGameNotification = (data: GameNotificationData) => {
      if (data?.name && data?.addedAt) {
        setNotifications((prev) => {
          const newNotifications = [data, ...prev];
          return cleanExpiredNotifications(newNotifications).slice(0, 10);
        });

        toast.info(`💜 Nouveau jeu ajouté : ${data.name}`);
      }
    };

    socket.on("game_notification", handleGameNotification);

    return () => {
      isMounted = false;
      socket.off("game_notification", handleGameNotification);
    };
  }, []);

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

