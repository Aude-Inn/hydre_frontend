import { useEffect, useState } from "react";
import socket from "../utils/socket";
import { MessageData } from "../types/socket.types";
import { deleteMessage } from "../services/MessageService";

export function AdminDashboardMessage() {
  const [messages, setMessages] = useState<MessageData[]>([]);

  useEffect(() => {
    const handleHistory = (history: MessageData[]) => {
      console.log("[AdminDashboard] Message history reçu:", history);
      setMessages(
        history.sort(
          (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        )
      );
    };

    const handleNewMessage = (data: MessageData) => {
      console.log("[AdminDashboard] Nouveau message reçu:", data);
      setMessages((prev) => [data, ...prev]);
    };

    socket.emit("request_history");
    console.log("[AdminDashboard] Émission 'request_history'");

    socket.on("message_history", handleHistory);
    socket.on("receive_message", handleNewMessage);

    return () => {
      socket.off("message_history", handleHistory);
      socket.off("receive_message", handleNewMessage);
    };
  }, []);

  const handleDelete = async (messageId: string) => {
    try {
      await deleteMessage(messageId);
      console.log(`[AdminDashboard] Message supprimé: ${messageId}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    } catch (error) {
      console.error("[AdminDashboard] Erreur suppression :", error);
    }
  };

  const handleReply = (msg: MessageData) => {
    const reply = prompt(`Répondre à ${msg.userName || `#${msg.userId}`}`, "");
    if (reply && reply.trim()) {
      const replyData = {
        userId: msg.userId,
        text: reply,
        replyTo: msg._id,
      };
      console.log("[AdminDashboard] Envoi de la réponse via 'admin_reply':", replyData);
      socket.emit("admin_reply", replyData);
    } else {
      console.log("[AdminDashboard] Réponse annulée ou vide");
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/5 backdrop-blur-md mt-6">
      <table className="min-w-[700px] w-full text-sm md:text-base text-white">
        <thead className="bg-white/10 text-teal-200">
          <tr>
            <th className="py-3 px-4 text-left">Utilisateur</th>
            <th className="py-3 px-4 text-left">Message</th>
            <th className="py-3 px-4 text-left hidden sm:table-cell">Date</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.length > 0 ? (
            messages.map((msg) => (
              <tr
                key={msg._id}
                className="border-b border-white/10 hover:bg-white/5 transition"
              >
                <td className="py-2 px-4 font-semibold">
                  {msg.userName || `#${msg.userId}`}
                </td>
                <td className="py-2 px-4">{msg.text}</td>
                <td className="py-2 px-4 hidden sm:table-cell">
                  {new Date(msg.timestamp).toLocaleString()}
                </td>
                <td className="py-2 px-4 flex items-center gap-2">
                  <button
                    onClick={() => handleReply(msg)}
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                    title="Répondre"
                  >
                    💬
                  </button>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                    title="Supprimer"
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

