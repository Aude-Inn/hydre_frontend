import { io, Socket } from "socket.io-client";
import { GameNotificationData, MessageData } from "../types/socket.types";


const SOCKET_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

interface ServerToClientEvents {
  game_notification: (data: GameNotificationData) => void;
  receive_message: (data: MessageData) => void;
  message_history: (data: MessageData[]) => void; 
}

interface ClientToServerEvents {
  send_message: (data: Omit<MessageData, "_id" | "timestamp">) => void;
  request_history: () => void; 
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, {
  transports: ["websocket"], 
  autoConnect: true, 
  reconnection: true, 
  reconnectionAttempts: Infinity, 
  reconnectionDelay: 1000, 
});

export default socket;



