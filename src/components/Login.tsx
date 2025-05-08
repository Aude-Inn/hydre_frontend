import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../services/UsersService";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Email et mot de passe sont requis");
      setLoading(false);
      return;
    }

    try {
      const { token, user } = await loginUser(email, password);
      if (!user || !user.role) {
        setError("Les données utilisateur sont incorrectes");
        setLoading(false);
        return;
      }

      login(user, token);
      navigate(user.role === "admin" ? "/dashboard" : "/profile");
    } catch (err) {
      console.error("Erreur lors de la connexion : ", err);
      setError("Une erreur s'est produite lors de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full sm:max-w-md mx-auto p-6 sm:p-8 bg-black/20 backdrop-blur-sm rounded-2xl shadow-lg border border-teal-400/20">
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-teal-300 uppercase tracking-wide">
        Connexion
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-pink-200">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mt-2 bg-black/30 text-white placeholder-gray-400 border border-purple-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="email@ici.com"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-pink-200">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mt-2 bg-black/30 text-white placeholder-gray-400 border border-purple-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="mb-4 text-right">
          <a href="/forgot-password" className="text-sm text-teal-300 hover:text-pink-400">
            Mot de passe oublié ?
          </a>
        </div>

        {error && <div className="text-red-400 mb-4">{error}</div>}

        <button
          type="submit"
          className={`w-full py-2 px-4 bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400 text-white font-semibold rounded-md hover:opacity-90 transition-all duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Chargement..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

