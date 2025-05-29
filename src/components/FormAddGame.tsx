import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { formatDateForInput } from "../utils/formatDate";
import { Game } from "../types/game.type";
import { gameAdd, gameUpdate } from "../services/GameService";

interface FormAddGameProps {
  game: Game | null;
  onGameAdded: (newGame: Game) => void;
  onCancel: () => void;
}

export const FormAddGame = ({
  game,
  onGameAdded,
  onCancel,
}: FormAddGameProps) => {
  const [gameData, setGameData] = useState<Game>({
    _id: "",
    name: "",
    releaseDate: formatDateForInput(new Date()),
    platforms: "",
    genre: "",
    minPlayers: 1,
    steamLink: "",
    image: "",
    averageRating: 0,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

 useEffect(() => {
  if (game) {
    setGameData({
      ...game,
      releaseDate: game.releaseDate
        ? formatDateForInput(new Date(game.releaseDate))
        : formatDateForInput(new Date()),
    });
  }
}, [game]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGameData((prevGame) => ({
      ...prevGame,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(null);

    const updatedGame = { ...gameData };

    try {
      if (gameData._id && gameData._id !== "") {
        onGameAdded(await gameUpdate(gameData._id, updatedGame));
      } else {
        onGameAdded(await gameAdd(gameData));
      }

      setLoading(false);
      setSuccessMessage(gameData._id ? "Jeu mis à jour avec succès!" : "Jeu ajouté avec succès!");

      setGameData({
        _id: "",
        name: "",
        releaseDate: formatDateForInput(new Date()),
        platforms: "",
        genre: "",
        minPlayers: 1,
        steamLink: "",
        image: "",
        averageRating: 0,
      });

     
      setTimeout(() => {
        onCancel();
      }, 500);
    } catch (err) {
      console.error("Erreur lors de la requête :", err);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-black/30 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-md animate-fade-in"
    >
      {successMessage && (
        <div className="text-green-400 font-semibold text-center">{successMessage}</div>
      )}

      {[
        { label: "Nom du jeu", name: "name", type: "text" },
        { label: "Date de sortie", name: "releaseDate", type: "date" },
        { label: "Plateformes", name: "platforms", type: "text" },
        { label: "Genre", name: "genre", type: "text" },
        { label: "Nombre de joueurs minimum", name: "minPlayers", type: "number" },
        {
          label: "Note",
          name: "averageRating",
          type: "number",
          step: "0.1",
          min: "0",
          max: "5",
        },
        { label: "Lien Steam", name: "steamLink", type: "url" },
        { label: "Image", name: "image", type: "text" },
      ].map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-white mb-1">
            {field.label}
          </label>
          <input
            {...field}
            id={field.name}
            value={gameData[field.name as keyof Game] as string | number}
            onChange={handleInputChange}
            required={field.name !== "image" && field.name !== "steamLink"}
            className="w-full px-4 py-2 bg-black/40 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          />
        </div>
      ))}

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition duration-300"
        >
          <Check size={20} />
          {loading ? "En cours..." : gameData._id ? "Mettre à jour" : "Ajouter"}
        </button>
      </div>
    </form>
  );
};
