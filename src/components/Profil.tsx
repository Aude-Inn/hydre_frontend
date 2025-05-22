import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import socket from "../utils/socket";

export function Profil() {
  const { user, logout, updateUserName } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSaveName = () => {
    if (newName.trim() && newName !== user?.name) {
      updateUserName(newName);
    }
    setIsEditing(false);
  };

 const handleSendMessage = () => {
  if (message.trim()) {
    console.log("[Client] Envoi message :", {
      userId: user?._id,
      userName: user?.name,
      text: message,
    });

    socket.emit("send_message", {
      userId: user?._id ?? "unknown",
      userName: user?.name ?? "Anonymous",
      text: message,
    });

    setMessage("");
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 3000);
  }
};

  if (!user) {
    return <p className="text-white text-center">Chargement...</p>;
  }

  const avatarUrl = `https://api.dicebear.com/6.x/pixel-art/svg?seed=${user.name}`;

  return (
    <div className="max-w-md mx-auto p-6 bg-black/20 backdrop-blur-sm border border-teal-400/20 rounded-2xl shadow-lg text-white">
      <div className="flex flex-col items-center mb-4 animate-fade-in">
        <img
          src={avatarUrl}
          alt="Avatar pixel"
          className="w-20 h-20 mb-2 rounded-full shadow-lg border border-white/10"
        />
        <h2 className="text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-teal-200">
          Mon Profil
        </h2>
      </div>

      <div className="mb-4 space-y-4">
        <div className="flex items-center gap-2">
          <p className="text-lg font-medium whitespace-nowrap">Nom :</p>
          {isEditing ? (
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="flex-1 p-2 bg-black/30 border border-gray-600 rounded-md text-white"
              placeholder="Nouveau nom"
            />
          ) : (
            <p className="text-lg font-semibold">{user.name}</p>
          )}
        </div>

        {isEditing && (
          <button
            onClick={handleSaveName}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Sauvegarder
          </button>
        )}

        <div className="flex items-center gap-2">
          <p className="text-lg font-medium whitespace-nowrap">Rôle :</p>
          <p className="text-lg font-semibold">{user.role}</p>
        </div>
      </div>

      {user.role === "user" && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Une proposition ?</h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez votre message ici..."
            rows={4}
            className="w-full p-2 bg-black/30 border border-gray-600 rounded-md text-white"
          />
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`w-full py-2 px-4 mt-2 rounded-md transition ${
              message.trim()
                ? "bg-green-500 hover:bg-green-600 focus:ring-green-500"
                : "bg-gray-500 cursor-not-allowed"
            } text-white`}
          >
            Envoyer le message
          </button>
          {messageSent && (
            <div className="mt-2 text-center text-green-300 animate-bounce">
              🎮 Message envoyé !
            </div>
          )}
        </div>
      )}

      <div className="text-center mt-6 space-y-2">
        {isEditing ? (
          <button
            onClick={() => setIsEditing(false)}
            className="w-full py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            Annuler
          </button>
        ) : (
          user.role === "user" && (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2 px-4 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition"
            >
              Modifier
            </button>
          )
        )}
        <button
          onClick={logout}
          className="w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}