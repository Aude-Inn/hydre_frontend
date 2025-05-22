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

    socket.emit("request_inbox", userId);

    const handleInbox = (msgs: MessageData[]) => {
      setMessages(msgs.filter((msg) => msg.toUserId === userId));
    };

    const handleReceive = (msg: MessageData) => {
      if (msg.toUserId === userId) setMessages((prev) => [msg, ...prev]);
    };

    socket.on("inbox_messages", handleInbox);
    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("inbox_messages", handleInbox);
      socket.off("receive_message", handleReceive);
    };
  }, [userId]);

  return (
    <div className="p-4 border rounded-md bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-2 text-black">Messages reçus</h2>
      {!messages.length ? (
        <p className="text-black">Aucun message.</p>
      ) : (
        <ul className="space-y-2">
          {messages.map((msg) => (
            <li key={msg._id} className="border-b pb-2">
              <div className="text-sm text-black">
                {new Date(msg.timestamp).toLocaleString()}
              </div>
              <div className="text-black">{msg.text}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

