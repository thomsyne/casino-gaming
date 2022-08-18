export interface GamesModel {
  categories: string[];
  name: string;
  image: string;
  id: string;
  isJackPot: boolean;
  amount?: number
}

export interface JackPotModel {
  game: string;
  amount: number;
}
