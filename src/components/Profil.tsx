import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import socket from "../utils/socket";
import { MessageData } from "../types/socket.types";

// ... imports
export function Profil() {
  const { user, logout, updateUserName } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const userId = user?._id;

  useEffect(() => {
  if (!userId) return;

  const handleInbox = (msgs: MessageData[]) => {
    setMessages(msgs.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ));
  };

  socket.on("inbox_messages", handleInbox);
  socket.on("new_reply", (msg: MessageData) => {
    if (msg.toUserId === userId) setMessages(prev => [msg, ...prev]);
  });

  return () => {
    socket.off("inbox_messages", handleInbox);
    socket.off("new_reply");
  };
}, [userId]);

  const handleSendMessage = () => {
    if (!userId || !messageText.trim()) return;
    socket.emit("send_message", {
      userId,
      text: messageText.trim(),
      toUserId: null,
      replyTo: null,
    });
    setMessageText("");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-black">Profil</h1>
      <div className="mb-4">
        <label className="block font-semibold mb-1">Nom :</label>
        {isEditing ? (
          <>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} className="border px-2 py-1 w-full" />
            <button onClick={() => { updateUserName(newName.trim()); setIsEditing(false); }} className="bg-green-500 text-white px-3 py-1 mt-2">Enregistrer</button>
          </>
        ) : (
          <>
            <div>{user?.name}</div>
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-3 py-1 mt-2">Modifier</button>
          </>
        )}
      </div>
      <button onClick={() => { logout(); navigate("/login"); }} className="bg-red-500 text-white px-3 py-1 mb-4">Déconnexion</button>
      <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} rows={3} placeholder="Votre message..." className="border w-full px-2 py-1 mb-2" />
      <button onClick={handleSendMessage} className="bg-teal-600 text-white px-4 py-2">Envoyer</button>
      <h2 className="text-xl font-semibold my-4 text-black">Historique</h2>
      {messages.map((msg) => (
        <div key={msg._id} className="mb-2">
          <div className="text-sm text-gray-600">{new Date(msg.timestamp).toLocaleString()}</div>
          <div className="text-black">{msg.text}</div>
          {msg.replyTo && <div className="text-xs italic text-gray-500">Réponse à #{msg.replyTo}</div>}
        </div>
      ))}
    </div>
  );
}
