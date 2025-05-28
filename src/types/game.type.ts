// Game type
export interface Game {
  _id: string;
  name: string;
  releaseDate: string;
  platforms: string;
  genre: string;
  minPlayers: number;
  steamLink: string;
  image: string;
  averageRating: number;
}
