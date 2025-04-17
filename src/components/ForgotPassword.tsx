import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { forgotPassword } from "../services/AuthService";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    if (!email) {
      setError("Veuillez entrer votre adresse email");
      setLoading(false);
      return;
    }

    try {
      const response = await forgotPassword(email);
      setMessage(response.message);
      setEmail("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else if (
        typeof err === "object" &&
        err !== null &&
        "response" in err
      ) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosError.response?.data?.message ||
            "Une erreur est survenue lors de la requête."
        );
      } else {
        setError("Une erreur inconnue est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center text-white px-4">
      <div className="w-full max-w-md p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-400">
          Mot de passe oublié
        </h2>

        {message && (
          <div className="bg-green-200/20 border border-green-400 text-green-300 px-4 py-3 rounded mb-4 text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-200/20 border border-red-400 text-red-300 px-4 py-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-pink-300 mb-1"
            >
              Adresse email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre adresse email"
              required
              className="w-full px-4 py-2 text-black placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-gradient-to-r from-teal-400 via-pink-400 to-purple-500 text-white font-semibold rounded-md shadow-md hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Envoi en cours..." : "Réinitialiser mon mot de passe"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm text-teal-300 hover:text-teal-400 transition"
          >
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}

