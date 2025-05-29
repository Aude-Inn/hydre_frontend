import axios from "axios";
import { API_ENDPOINTS } from "../utils/apiConfig";
import { Game } from "../types/game.type";


// Token + Headers
function getAuthConfig() {
  const token = localStorage.getItem("token");
  return token
    ? {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    : {
        headers: {
          "Content-Type": "application/json",
        },
      };
}

// All games
export async function getGames(): Promise<Game[]> {
  try {
    const response = await axios.get(API_ENDPOINTS.games);
    return response.data;
  } catch (error) {
    console.error("[GameService] Erreur récupération jeux :", error);
    throw error;
  }
}

// Game by Id
export async function getGameById(id: string): Promise<Game> {
  try {
    const response = await axios.get(API_ENDPOINTS.gameById(id));
    return response.data;
  } catch (error) {
    console.error(`[GameService] Erreur récupération jeu id=${id} :`, error);
    throw error;
  }
}

// Add game
export async function gameAdd(gameData: Game): Promise<Game> {
  try {
    const config = getAuthConfig();
    const response = await axios.post(API_ENDPOINTS.games, gameData, config);
    return response.data.game;
  } catch (error) {
    console.error("[GameService] Erreur ajout jeu :", error);
    throw error;
  }
}

// Update game
export async function gameUpdate(id: string, updatedGame: Game): Promise<Game> {
  try {
    const config = getAuthConfig();
    const response = await axios.put(API_ENDPOINTS.gameById(id), updatedGame, config);
    return response.data;
  } catch (error) {
    console.error(`[GameService] Erreur mise à jour jeu id=${id} :`, error);
    throw error;
  }
}

// Delete game
export async function deleteGame(id: string): Promise<void> {
  try {
    const config = getAuthConfig();
    await axios.delete(API_ENDPOINTS.gameById(id), config);
  } catch (error) {
    console.error(`[GameService] Erreur suppression jeu id=${id} :`, error);
    throw error;
  }
}

// Search games
export async function searchGames(query: string): Promise<Game[]> {
  try {
    const response = await axios.get(API_ENDPOINTS.search, { params: { search: query } });
    return response.data;
  } catch (error) {
    console.error("Erreur recherche jeux :", error);
    throw error;
  }
}

// Top games
export async function topGames(): Promise<Game[]> {
  try {
    const response = await axios.get(API_ENDPOINTS.topGames);
    return response.data;
  } catch (error) {
    console.error("Erreur recherche jeux :", error);
    throw error;
  }
}