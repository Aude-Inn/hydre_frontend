import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { getGame } from "../services/GameService";
import { Game } from "../types/game.type";

export function TopGamesTable() {
  const [topGames, setTopGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const axiosGames = async () => {
      try {
        const loadedGames = await getGame();

        const sortedGames = loadedGames
          .sort((a, b) => b.averageRating - a.averageRating)
          .slice(0, 5);

        setTopGames(sortedGames);
      } catch (err) {
        setError("Une erreur s'est produite lors de la récupération des jeux.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    axiosGames();
  }, []);

  if (loading) return <div className="text-center text-gray-600">Chargement...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="mt-12 px-4">
      <h2 className="text-center text-3xl font-bold mb-6 text-teal-300 drop-shadow-sm">
        Top 5 🌟
      </h2>

      <div className="rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm shadow-lg overflow-x-auto">
        <table className="min-w-full table-auto text-sm md:text-base text-white" aria-label="Top 5 des jeux les mieux notés">
          <caption className="sr-only">
            Tableau des 5 jeux les mieux notés sur la plateforme.
          </caption>
          <thead className="bg-white/10 text-white">
            <tr>
              <th scope="col" className="py-3 px-6 text-left">Rang</th>
              <th scope="col" className="py-3 px-6 text-left">Nom</th>
              <th scope="col" className="py-3 px-6 text-left">Note moyenne</th>
            </tr>
          </thead>
          <tbody>
            {topGames.map((game, index) => (
              <tr
                key={game._id}
                className="border-b border-white/10 hover:bg-white/10 transition duration-200"
              >
                <td className="py-3 px-6 font-semibold text-teal-300">{index + 1}</td>

                
                <td className="py-3 px-6">
                  <Link
                    to={`/game-details/${game._id}`}
                    className="text-pink-300 hover:underline"
                  >
                    {game.name}
                  </Link>
                </td>

                <td className="py-3 px-6 font-semibold text-pink-300">
                  {game.averageRating.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


