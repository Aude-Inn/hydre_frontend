import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchGames } from "../services/GameService";
import { Game } from "../types/game.type";

export function SearchBar({
  className,
  onResults,
}: {
  className?: string;
  onResults?: (results: Game[]) => void;
}) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Game[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length === 0) {
      setSuggestions([]);
      onResults?.([]); 
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      searchGames(query)
        .then((games) => {
          setSuggestions(games || []);
          onResults?.(games || []);
        })
        .catch((err) => {
          console.error("Erreur recherche jeux :", err);
          setSuggestions([]);
          onResults?.([]);
        });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, onResults]);

  const handleSelect = (gameId: string) => {
    setQuery(""); 
    setSuggestions([]); 
    navigate(`/game-details/${gameId}`);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        placeholder="🔍 Recherche un jeu..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-full bg-black/20 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
      />
      {query.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full bg-black/90 rounded-lg border border-white/10 shadow-lg max-h-60 overflow-y-auto text-white">
          {suggestions.length > 0 ? (
            suggestions.map((game) => (
              <li
                key={game._id}
                onClick={() => handleSelect(game._id)}
                className="px-4 py-2 hover:bg-white/10 cursor-pointer transition"
              >
                {game.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-white/50">Il n'est probablement pas encore dans la base, n'hésites pas à m'écrire !</li>
          )}
        </ul>
      )}
    </div>
  );
}


