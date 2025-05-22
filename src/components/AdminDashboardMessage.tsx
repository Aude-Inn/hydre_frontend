import { useEffect, useState } from "react";
import socket from "../utils/socket";
import { MessageData } from "../types/socket.types";
import { deleteMessage } from "../services/MessageService";

export function AdminDashboardMessage() {
  const [messages, setMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    socket.emit("request_history");

    const handleHistory = (history: MessageData[]) => {
      setMessages(
        history.sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
      );
    };

    const handleNewMessage = (data: MessageData) => {
      setMessages((prev) => [data, ...prev]);
    };

    const handleAdminReply = (reply: MessageData) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === reply.replyTo
            ? { ...msg, replyText: reply.text, replyTimestamp: reply.timestamp }
            : msg
        )
      );
    };

    socket.on("message_history", handleHistory);
    socket.on("receive_message", handleNewMessage);
    socket.on("new_reply", handleAdminReply);

    return () => {
      socket.off("message_history", handleHistory);
      socket.off("receive_message", handleNewMessage);
      socket.off("new_reply", handleAdminReply);
    };
  }, []);

  const handleDelete = async (id: string) => {
    await deleteMessage(id);
    setMessages((prev) => prev.filter((msg) => msg._id !== id));
  };

  const handleReply = (msg: MessageData) => {
    const text = prompt(`Réponse à ${msg.userName || `#${msg.userId}`}`, "");
    if (!text?.trim()) return;

    socket.emit("send_message", {
      userId: "admin",
      toUserId: msg.userId,
      text: text.trim(),
      replyTo: msg._id,
    });
  };

  return (
    <div className="overflow-x-auto rounded-lg border bg-white/5 mt-6">
      <table className="min-w-[700px] w-full text-white">
        <thead className="bg-white/10 text-teal-200">
          <tr>
            <th className="py-3 px-4">Utilisateur</th>
            <th className="py-3 px-4">Message</th>
            <th className="py-3 px-4 hidden sm:table-cell">Date</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.length ? (
            messages.map((msg) => (
              <tr key={msg._id} className="border-b hover:bg-white/5">
                <td className="py-2 px-4">{msg.userName || `#${msg.userId}`}</td>
                <td className="py-2 px-4">
                  {msg.text}
                  {msg.replyText && (
                    <div className="mt-2 text-xs text-green-300 border-t border-green-400 pt-1">
                      <strong>Réponse admin :</strong> {msg.replyText}
                      <br />
                      <span className="text-gray-400">
                        {new Date(msg.replyTimestamp!).toLocaleString()}
                      </span>
                    </div>
                  )}
                </td>
                <td className="py-2 px-4 hidden sm:table-cell">
                  {new Date(msg.timestamp).toLocaleString()}
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => handleReply(msg)}
                    className="bg-blue-500 text-white rounded-full w-8 h-8"
                  >
                    💬
                  </button>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="bg-red-500 text-white rounded-full w-8 h-8"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4 text-white">
                Aucun message reçu.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
