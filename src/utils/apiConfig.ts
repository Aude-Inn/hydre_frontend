export const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ENDPOINTS

export const API_ENDPOINTS = {
  games: `${BASE_API_URL}/api/games`,
  gameById: (id: string) => `${BASE_API_URL}/api/games/${id}`,
  messages: `${BASE_API_URL}/api/messages`,
  messageById: (id: string) => `${BASE_API_URL}/api/messages/${id}`,
  users: `${BASE_API_URL}/api/users`,
  userById: (id: string) => `${BASE_API_URL}/api/users/${id}`,
  authLogin: `${BASE_API_URL}/api/auth/login`,
  auth: `${BASE_API_URL}/api/auth`,
  notifs: `${BASE_API_URL}/api/notifs`,
  search:`${BASE_API_URL}/api/games/search`,
  topGames:`${BASE_API_URL}/api/games/top`,
};