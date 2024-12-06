import { StatsPerGame } from "./Stats";

export type Game = {
  id: string;
  statsPerGame: StatsPerGame[];
  gameScreenshot?: string;
  createdAt: Date;
};
