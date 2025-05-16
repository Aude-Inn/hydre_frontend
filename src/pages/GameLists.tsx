import { GamesTable } from "../components/GamesTable";
import { SearchBar } from "../components/Search";

export function GameLists() {
  return (
    <div className="min-h-screen px-4 py-10 flex flex-col items-center justify-start text-white rounded-3xl">
      
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-teal-300 animate-fade-in">
        Game List :
      </h1>

      <div className="w-full max-w-6xl space-y-16">

      <div className="relative bg-black/20 backdrop-blur-sm border border-teal-400/20 shadow-lg rounded-3xl p-4 sm:p-6">
  <SearchBar />
</div>
     
        <div className="bg-black/20 backdrop-blur-sm border border-teal-400/20 shadow-lg rounded-3xl p-4 sm:p-8 overflow-x-auto">
          <GamesTable isDashboard={false} />
        </div>
      </div>
    </div>
  );
}

