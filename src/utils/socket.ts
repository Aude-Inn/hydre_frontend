import { io, Socket } from "socket.io-client";
import { GameNotificationData, MessageData } from "../types/socket.types";

const getUser = () => {
  const userStr = localStorage.getItem("user");
  try {
    return userStr ? JSON.parse(userStr) : null;
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
   new_reply: (data: MessageData) => void;
}

interface ClientToServerEvents {
  send_message: (data: {
    userId: string;
    text: string;
    toUserId?: string | null;
    replyTo?: string | null;
  }) => void;
  request_history: () => void;
  request_inbox: (userId: string) => void;
}

const user = getUser();
const userId = user?._id || "";
const isAdmin = user?.role === "admin" ? "true" : "false";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
  reconnection: true,
  query: {
    userId,
    isAdmin,
  },
});

export default socket;
