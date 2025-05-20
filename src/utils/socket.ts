import { io, Socket } from "socket.io-client";
import { GameNotificationData, MessageData } from "../types/socket.types";


const getUserId = () => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;

  try {
    const user = JSON.parse(userStr);
    return user._id || null;
  } catch {
    return null;
  }
};

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface ServerToClientEvents {
  game_notification: (data: GameNotificationData) => void;
  receive_message: (data: MessageData) => void;
  message_history: (data: MessageData[]) => void;
  inbox_messages: (data: MessageData[]) => void; 
}

interface ClientToServerEvents {
  send_message: (data: Omit<MessageData, "_id" | "timestamp">) => void;
  request_history: () => void;
  request_inbox: (userId: string) => void; 
  admin_reply: (data: {
    userId: string;
    text: string;
    replyTo: string;
  }) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,

  
  auth: {
    userId: getUserId() || "", 
  },
});

export default socket;




