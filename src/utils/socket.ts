import { io, Socket } from "socket.io-client";
import { GameNotificationData, MessageData } from "../types/socket.types";


interface ServerToClientEvents {
  game_notification: (data: GameNotificationData) => void;
  receive_message: (data: MessageData) => void;
  message_history: (data: MessageData[]) => void; 
}

interface ClientToServerEvents {
  send_message: (data: Omit<MessageData, "_id" | "timestamp">) => void;
  request_history: () => void; 
}

export type { ServerToClientEvents, ClientToServerEvents };

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  import.meta.env.VITE_API_URL || "http://localhost:5000",
  {
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
  }
);

export default socket;
