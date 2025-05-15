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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-500">
          Réinitialisation du mot de passe
        </h2>

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 text-center">
            {message}
            <p className="text-sm mt-2 text-green-600">
              Vous allez être redirigé vers la page de connexion...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center">
            {error}
          </div>
        )}

        {!message && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label htmlFor="password" className="block text-sm font-medium text-pink-500 mb-1">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre nouveau mot de passe"
                required
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-100 focus:border-pink-300"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-pink-500 mb-1">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmez votre nouveau mot de passe"
                required
                className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-pink-100 focus:border-pink-300"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? 'Traitement en cours...' : 'Réinitialiser mon mot de passe'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
