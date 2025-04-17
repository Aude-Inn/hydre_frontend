import { useState, useEffect } from "react";
import { FormAddGame } from "./FormAddGame";
import { formatDateForInput } from "../utils/formatDate";
import { Game } from "../types/game.type";
import { deleteGame, getGame } from "../services/GameService";
import { Link } from "react-router-dom";

interface GamesTableProps {
  isDashboard: boolean;
}

export function GamesTable({ isDashboard }: GamesTableProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  useEffect(() => {
    const axiosGames = async () => {
      try {
        const loadedGames = await getGame();
        setGames(loadedGames);
      } catch (error) {
        console.log("Error loading games:", error);
      } finally {
        setLoading(false);
      }
    };
    axiosGames();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteGame(id);
    setGames(games.filter((game) => game._id !== id));
  };

  const handleEdit = (game: Game) => {
    setEditingGame(game);
    setIsAdding(true);
  };

  const handleCancelEdit = () => {
    setEditingGame(null);
    setIsAdding(false);
  };

  const handleGameUpdate = (updatedGame: Game) => {
    const isEdit = games.some((game) => game._id === updatedGame._id);

    if (isEdit) {
      // Mise à jour du jeu existant
      setGames((prevGames) =>
        prevGames.map((g) => (g._id === updatedGame._id ? updatedGame : g))
      );
    } else {
      // Ajout d’un nouveau jeu
      setGames((prevGames) => [...prevGames, updatedGame]);
    }

    setIsAdding(false);
    setEditingGame(null);
  };

  if (loading) {
    return <div className="text-center text-white">Loading... Wait</div>;
  }

  return (
    <div className="w-full">
      {isDashboard && !isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="mb-4 flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
        >
          ➕
        </button>
      )}

      {isAdding && (
        <div className="mb-6">
          <FormAddGame
            game={
              editingGame || {
                _id: "",
                name: "",
                releaseDate: formatDateForInput(new Date()),
                platforms: "",
                genre: "",
                minPlayers: 1,
                steamLink: "",
                image: "",
                averageRating: 0,
              }
            }
            onGameAdded={handleGameUpdate}
            onCancel={handleCancelEdit}
          />

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleCancelEdit}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition"
            >
              ❌
            </button>
          </div>
        </div>
      )}

      {!isAdding && (
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="min-w-[800px] w-full bg-black/10 text-white rounded-lg text-sm md:text-base">
            <thead className="bg-white/10 text-teal-200">
              <tr>
                <th className="py-3 px-4 text-left">Nom</th>
                <th className="py-3 px-4 text-left hidden sm:table-cell">Date</th>
                <th className="py-3 px-4 text-left hidden sm:table-cell">Plateformes</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">Genre</th>
                <th className="py-3 px-4 text-left hidden md:table-cell">Joueurs</th>
                <th className="py-3 px-4 text-left hidden sm:table-cell">Steam</th>
                {isDashboard && <th className="py-3 px-4 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game._id} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="py-2 px-4">
                    <Link to={`/game-details/${game._id}`} className="text-pink-300 hover:underline">
                      {game.name}
                    </Link>
                  </td>
                  <td className="py-2 px-4 hidden sm:table-cell">
                    {isNaN(new Date(game.releaseDate).getTime())
                      ? "Date invalide"
                      : formatDateForInput(new Date(game.releaseDate))}
                  </td>
                  <td className="py-2 px-4 hidden sm:table-cell">{game.platforms}</td>
                  <td className="py-2 px-4 hidden md:table-cell">{game.genre}</td>
                  <td className="py-2 px-4 hidden md:table-cell">{game.minPlayers}</td>
                  <td className="py-2 px-4 hidden sm:table-cell">
                    <a
                      href={game.steamLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 hover:underline"
                    >
                      Steam
                    </a>
                  </td>
                  {isDashboard && (
                    <td className="py-2 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(game)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-full w-8 h-8 flex items-center justify-center transition"
                          title="Modifier"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(game._id)}
                          className="bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                          title="Supprimer"
                        >
                          ❌
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

