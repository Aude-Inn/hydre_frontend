import axios from "axios";
import { API_ENDPOINTS } from "../utils/apiConfig";
import { Game } from "../types/game.type";

// API GAMES
const BASE_URL = API_ENDPOINTS.games;

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

// All game
export async function getGame(): Promise<Game[]> {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("[GameService] Erreur récupération jeux :", error);
    throw error;
  }
}

//Game by Id
export async function getGameById(id: string): Promise<Game> {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`[GameService] Erreur récupération jeu id=${id} :`, error);
    throw error;
  }
}

// Add
export async function gameAdd(gameData: Game): Promise<Game> {
  try {
    const config = getAuthConfig();
    const response = await axios.post(BASE_URL, gameData, config);
    return response.data;
  } catch (error) {
    console.error("[GameService] Erreur ajout jeu :", error);
    throw error;
  }
}

// Update game
export async function gameUpdate(id: string, updatedGame: Game): Promise<Game> {
  try {
    const config = getAuthConfig();
    const response = await axios.put(`${BASE_URL}/${id}`, updatedGame, config);
    return response.data;
  } catch (error) {
    console.error(`[GameService] Erreur mise à jour jeu id=${id} :`, error);
    throw error;
  }
}

// Delete by id
export async function deleteGame(id: string): Promise<void> {
  try {
    const config = getAuthConfig();
    await axios.delete(`${BASE_URL}/${id}`, config);
  } catch (error) {
    console.error(`[GameService] Erreur suppression jeu id=${id} :`, error);
    throw error;
  }
}

// Filtre Search
export async function searchGames(query: string): Promise<Game[]> {
  try {
    const response = await axios.get(`${BASE_URL}/search`, { params: { search: query } });
    console.log("API response data:", response.data);
    return response.data; 
  } catch (error) {
    console.error("Erreur recherche jeux :", error);
    throw error;
  }
}


