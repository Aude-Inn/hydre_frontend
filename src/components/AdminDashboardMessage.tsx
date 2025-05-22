import { useEffect, useState } from "react";
import socket from "../utils/socket";
import { MessageData } from "../types/socket.types";
import { deleteMessage } from "../utils/socket";

export function MessagesList() {
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  socket.emit("request_messages");

  socket.on("messages", (msgs) => {
    setMessages(msgs);
  });

  socket.on("newMessage", (msg) => {
    setMessages((prev) => [msg, ...prev]);
  });

  socket.on("deleteMessage", (id) => {
    setMessages((prev) => prev.filter((msg) => msg._id !== id));
  });

  socket.on("error", (msg) => {
    setError(msg);
  });

  return () => {
    socket.off("messages");
    socket.off("newMessage");
    socket.off("deleteMessage");
    socket.off("error");
  };
}, []);


  const handleDelete = (id: string) => {
    deleteMessage(id);
  };

  return (
    <div>
      <h2>Messages</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {messages.length === 0 ? (
        <p>Aucun message.</p>
      ) : (
        <ul>
          {messages.map(({ _id, userId, text, timestamp }) => (
            <li key={_id} style={{ marginBottom: 10 }}>
              <strong>{userId}</strong>: {text}{" "}
              <em>({new Date(timestamp).toLocaleString()})</em>
              <button
                onClick={() => handleDelete(_id)}
                style={{ marginLeft: 10, color: "red" }}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


