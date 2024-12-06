import { Stats, StatsPerGame } from "./Stats";

export type Player = {
  id: string;
  nickname: string;
  statsId: string;
  stats: Stats;
  statsPerGame: StatsPerGame[];
  createdAt: Date;
};
