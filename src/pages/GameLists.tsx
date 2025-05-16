import { GamesTable } from "../components/GamesTable";
import { SearchBar } from "../components/Search";

export function GameLists() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start rounded-3xl text-white px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-teal-300 animate-fade-in">
        Game List :
      </h1>

      <SearchBar className="mb-8" />
      
      <div className="w-full max-w-6xl bg-black/20 backdrop-blur-sm border border-teal-400/20 shadow-lg rounded-3xl p-4 sm:p-8 overflow-x-auto">
        <GamesTable isDashboard={false} />
      </div>
    </div>
  );
}

