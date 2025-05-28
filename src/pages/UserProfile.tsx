import { Profil } from "../components/Profil";

export function UserProfile() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md bg-black/20 backdrop-blur-sm border border-teal-400/20 shadow-lg rounded-2xl p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-teal-200 mb-6">
          Un espace rien que pour toi 🐲
        </h1>

        {/* Profil */}
        <Profil/>
      </div>
    </div>
  );
}

