import { useState, useEffect } from "react";
import { searchGames } from "../services/GameService";
import { Game } from "../types/game.type";

export function SearchBar({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Game[]>([]);

  useEffect(() => {
  if (query.length === 0) {
    setSuggestions([]);
    return;
  }

  console.log("Query actuelle :", query); 

  const delayDebounceFn = setTimeout(() => {
    searchGames(query)
      .then((games) => {
        console.log("Résultat filtré :", games); 
        setSuggestions(games || []);
      })
      .catch((err) => {
        console.error("Erreur recherche jeux :", err);
        setSuggestions([]);
      });
  }, 300);

  return () => clearTimeout(delayDebounceFn);
}, [query]);

  return (
    <div className={className}>
      <input
        type="text"
        value={query}
        placeholder="Recherche un jeu..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {suggestions.length > 0 ? (
          suggestions.map((game) => <li key={game._id}>{game.name}</li>)
        ) : (
          query.length > 0 && <li>Aucun résultat</li>
        )}
      </ul>
    </div>
  );
}
