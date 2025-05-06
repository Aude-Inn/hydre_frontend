import axios from "axios";
import { Game } from "../types/game.type";

// Base URL
const BASE_URL = `${process.env.REACT_APP_BASE_URL || "http://localhost:5000"}/games`;


const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//  mettre à jour un jeu
export async function gameUpdate(id: string, updatedGame: Game): Promise<Game> {
  const {...game } = updatedGame; 
  console.log("[Service] Mise à jour du jeu avec ID :", id);

  try {
    const response = await axios.put(`${BASE_URL}/${id}`, game, config);
    return response.data;
  } catch (error) {
    console.error("[Service] Erreur lors de la mise à jour du jeu :", error);
    throw error;
  }
}

// ajouter un nouveau jeu
export async function gameAdd(gameData: Game): Promise<Game> {
  const {...game } = gameData; 
  console.log("[Service] Ajout d'un nouveau jeu");

  try {
    const response = await axios.post(BASE_URL, game, config);
    return response.data;
  } catch (error) {
    console.error("[Service] Erreur lors de l'ajout du jeu :", error);
    throw error;
  }
}

// supprimer un jeu par ID
export async function deleteGame(id: string): Promise<void> {
  console.log("[Service] Suppression du jeu avec ID :", id);

  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    if (response.status === 200) {
      console.log("[Service] Jeu supprimé avec succès :", id);
    } else {
      console.error("[Service] Échec de la suppression du jeu :", id);
    }
  } catch (error) {
    console.error("[Service] Erreur lors de la suppression du jeu :", error);
    throw error;
  }
}

// récupérer tous les jeux
export async function getGame(): Promise<Game[]> {
  console.log("[Service] Récupération de tous les jeux");

  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("[Service] Erreur lors de la récupération des jeux :", error);
    throw error;
  }
}

// récupérer un jeu par ID
export async function getGameById(id: string): Promise<Game> {
  console.log("[Service] Récupération du jeu avec ID :", id);

  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("[Service] Erreur lors de la récupération du jeu :", error);
    throw error;
  }
}
