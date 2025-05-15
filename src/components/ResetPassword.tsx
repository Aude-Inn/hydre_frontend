import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/AuthService';
import { isValidPassword } from "../utils/validators";

export function ResetPassword(): JSX.Element {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');
  setError('');

  if (!password || !confirmPassword) {
    setError('Veuillez remplir tous les champs');
    setLoading(false);
    return;
  }

  if (password !== confirmPassword) {
    setError('Les mots de passe ne correspondent pas');
    setLoading(false);
    return;
  }

  if (!isValidPassword(password)) {
    setError(
      'Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.'
    );
    setLoading(false);
    return;
  }

  try {
    if (!token) throw new Error('Token manquant');

    const response = await resetPassword(token, password);
    setMessage(response.message);

    setTimeout(() => navigate('/login'), 3000);
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else if (typeof err === 'object' && err !== null && 'response' in err) {
      const axiosError = err as { response?: { data?: { message?: string } } };
      setError(axiosError.response?.data?.message || 'Une erreur est survenue');
    } else {
      setError('Une erreur inconnue est survenue');
    }
  } finally {
    setLoading(false);
  }
};

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-black/80">
    <div className="w-full sm:max-w-md mx-auto p-6 sm:p-8 bg-black/20 backdrop-blur-sm rounded-2xl shadow-lg border border-teal-400/20">
      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-teal-300 uppercase tracking-wide">
        Réinitialisation
      </h2>

      {message && (
        <div className="bg-green-100/10 border border-green-300 text-green-300 px-4 py-3 rounded relative mb-4 text-center text-sm">
          {message}
          <p className="mt-2 text-green-400">
            Vous allez être redirigé vers la page de connexion...
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-100/10 border border-red-300 text-red-300 px-4 py-3 rounded relative mb-4 text-center text-sm">
          {error}
        </div>
      )}

      {!message && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-pink-200">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre nouveau mot de passe"
              required
              className="w-full px-4 py-2 mt-2 bg-black/30 text-white placeholder-gray-400 border border-purple-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-pink-200">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmez votre mot de passe"
              required
              className="w-full px-4 py-2 mt-2 bg-black/30 text-white placeholder-gray-400 border border-purple-400/30 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-gradient-to-r from-pink-500 via-purple-500 to-teal-400 text-white font-semibold rounded-md hover:opacity-90 transition-all duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Traitement en cours..." : "Réinitialiser mon mot de passe"}
          </button>
        </form>
      )}
    </div>
  </div>
);
}
