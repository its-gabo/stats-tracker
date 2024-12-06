import { Game } from "./Game";
import { Player } from "./Player";

export type Stats = {
  id: string;
  kills: number;
  deaths: number;
  assists: number;
  wins: number;
  losses: number;
  kda: number;
  winRate: number;
  killParticipation: number;
  player?: Player;
  createdAt: Date;
  nickame: string;
};

export type StatsPerGame = {
  id: string;
  kills: number;
  deaths: number;
  assists: number;
  killParticipation: number;
  isWin: boolean;
  playerId?: string;
  player?: Player;
  gameId?: string;
  game?: Game;
  createdAt: Date;
};
