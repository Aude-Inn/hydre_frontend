import { useState, useEffect } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { getGameById } from "../services/GameService";
import { Game } from "../types/game.type";
import { formatDateForInput } from "../utils/formatDate";

export function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const AxiosGameDetails = async () => {
      try {
        if (id) {
          const response = await getGameById(id);
          setGame(response);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du jeu:", error);
      } finally {
        setLoading(false);
      }
    };

    AxiosGameDetails();
  }, [id]);

  if (loading) return <div className="text-white text-center mt-10">Chargement...</div>;
  if (!game) return <div className="text-red-500 text-center mt-10">Jeu non trouvé</div>;

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 ">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md text-white rounded-2xl shadow-xl p-6 space-y-4">
        <h1 className="text-3xl font-bold text-center">{game.name}</h1>
        
        <div className="flex justify-center">
          <img
            src={game.image}
            alt={game.name}
            className="rounded-xl shadow-lg max-h-64 object-contain"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
          <p><span className="font-semibold text-teal-300">Genre :</span> {game.genre}</p>
          <p><span className="font-semibold text-teal-300">Plateformes :</span> {game.platforms}</p>
          <p><span className="font-semibold text-teal-300">Joueurs minimum :</span> {game.minPlayers}</p>
          <p><span className="font-semibold text-teal-300">Note moyenne :</span> {game.averageRating} / 5</p>
          <p><span className="font-semibold text-teal-300">Sortie :</span> {formatDateForInput(new Date(game.releaseDate))}</p>
        </div>

        <div className="text-center mt-4 space-y-4">
  <a
    href={game.steamLink}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg transition"
  >
    Voir sur Steam
  </a>

  <button
    onClick={() => navigate("/game-lists")}
    className="block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition"
  >
    Retour à la liste des jeux
  </button>
</div>
      </div>
    </div>
  );
}
