import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { isValidPassword } from "../utils/validators";

export function FormSignUp() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  if (!email || !password || !name) {
    setError("Email, mot de passe et nom sont requis");
    setLoading(false);
    return;
  }

  if (!isValidPassword(password)) {
    setError(
      "Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial."
    );
    setLoading(false);
    return;
  }

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      name,
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);
    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      navigate("/Profile");
    }, 3000);
  } catch (error) {
    setLoading(false);
    if (error instanceof AxiosError && error.response) {
      if (error.response.status === 400) {
        setError("Utilisateur déjà existant");
      } else if (error.response.status === 500) {
        setError("Erreur serveur. Veuillez réessayer.");
      }
    }
  }
};

  return (
    <div className="w-full max-w-md bg-black/20 backdrop-blur-sm border border-teal-400/20 shadow-lg rounded-2xl p-6 sm:p-10 transition-all duration-500">
      
      {success && (
        <div className="flex flex-col items-center justify-center mb-6 animate-fade-in">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-teal-300 drop-shadow-[0_0_10px_rgba(20,250,250,0.8)] animate-bounce"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M2 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm13.707-2.707a1 1 0 00-1.414-1.414L10 12.172l-1.293-1.293a1 1 0 00-1.414 1.414L10 15l5.707-5.707z" />
          </svg>
          <p className="mt-3 text-teal-200 text-lg sm:text-xl font-semibold animate-pulse">
            Inscription réussie ! 🔥
          </p>
        </div>
      )}

      {/* Titre du formulaire */}
      <h2 className="text-2xl font-semibold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-teal-200">
        Inscris toi !
      </h2>

      {/* Formulaire d'inscription */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Champ pour le nom */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-teal-200">
            Nickname :
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 mt-2 bg-black/30 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        {/* Champ pour l'email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-teal-200">
            Email :
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-2 bg-black/30 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        {/* Champ pour le mot de passe */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-teal-200">
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 bg-black/30 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        {/* Message d'erreur */}
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}

        {/* Bouton d'envoi */}
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-pink-500 text-white rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Chargement..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}
