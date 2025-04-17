import { useState, useEffect } from "react";
import { Game } from "../types/game.type";
import { getGame } from "../services/GameService";

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const axiosGames = async () => {
      try {
        const loadedGames = await getGame();
        setGamesData(loadedGames);
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % loadedGames.length);
        }, 15000);
        return () => clearInterval(interval);
      } catch (error) {
        console.log("Error loading games:", error);
        setError("Erreur lors du chargement des jeux.");
      } finally {
        setLoading(false);
      }
    };
    axiosGames();
    return () => {
      setLoading(false);
    };
  }, []);

  if (loading) return <div>Loading... Wait</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center items-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] px-4">
      <div className="w-full max-w-4xl mx-auto p-[2px] rounded-2xl bg-gradient-to-r from-teal-400 via-pink-400 to-purple-500 shadow-lg">
        <div className="backdrop-blur-sm bg-black/20 rounded-2xl p-1">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-1000 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {gamesData.map((game) => (
                <div
                  key={game._id}
                  className="w-full h-full flex-shrink-0 flex justify-center items-center"
                >
                  <img
                    src={game.image}
                    alt={`Game ${game.name}`}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}


