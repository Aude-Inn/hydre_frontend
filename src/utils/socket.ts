import { io, Socket } from "socket.io-client";
import { MessageData } from "../types/socket.types";
import { GameNotificationData } from "../types/socket.types";

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
  messages: (msgs: MessageData[]) => void;       
  newMessage: (msg: MessageData) => void;         
  deleteMessage: (id: string) => void; 
  game_notification: (data: GameNotificationData) => void;          
  error: (msg: string) => void;                    
}

interface ClientToServerEvents {
  send_message: (data: Omit<MessageData, "_id" | "timestamp">, cb: (res: { success: boolean; error?: string }) => void) => void;
  request_messages: () => void;
  delete_message: (id: string) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  query: {
    userId: getUserId() || "",
  },
});

export default socket;

export const sendMessage = (
  message: Omit<MessageData, "_id" | "timestamp">,
  callback: (response: { success: boolean; error?: string }) => void
) => {
  socket.emit("send_message", message, callback);
};

export const deleteMessage = (id: string) => {
  socket.emit("delete_message", id);
};
