import { useEffect, useState } from "react";
import socket from "../utils/socket";
import { MessageData } from "../types/socket.types";
import { useAuth } from "../hooks/useAuth";

export function Messbox() {
  const { user } = useAuth();
  const userId = user?._id;
  const [messages, setMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    if (!userId) return;

    const handleConnect = () => {
      console.log("[Messbox] Socket connectée avec ID:", socket.id);
    };

    const handleInboxMessages = (msgs: MessageData[]) => {
      const filtered = msgs.filter((msg) => msg.toUserId === userId);
      setMessages(filtered);
      console.log("[Messbox] Inbox chargée:", filtered);
    };

    const handleNewMessage = (msg: MessageData) => {
      if (msg.toUserId === userId) {
        console.log("[Messbox] Nouveau message reçu:", msg);
        setMessages((prev) => [msg, ...prev]);
      } else {
        console.log("[Messbox] Message ignoré, toUserId différent:", msg.toUserId);
      }
    };

    socket.emit("request_inbox", userId);
    console.log("[Messbox] Émission 'request_inbox' avec userId:", userId);

    socket.on("connect", handleConnect);
    socket.on("inbox_messages", handleInboxMessages);
    socket.on("receive_message", handleNewMessage);

    return () => {
      console.log("[Messbox] Nettoyage des écouteurs socket");
      socket.off("connect", handleConnect);
      socket.off("inbox_messages", handleInboxMessages);
      socket.off("receive_message", handleNewMessage);
    };
  }, [userId]);

  return (
    <div className="p-4 border rounded-md bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-2">Messages reçus</h2>
      {messages.length === 0 ? (
        <p>Aucun message.</p>
      ) : (
        <ul className="space-y-2">
          {messages.map((msg) => (
            <li key={msg._id} className="border-b pb-2">
              <div className="text-sm text-gray-500">
                {new Date(msg.timestamp).toLocaleString()}
              </div>
              <div>{msg.text}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
