import { GameSide } from '@common/types';

export interface IGame {
  id: number;
  whitePlayer: number;
  blackPlayer: number;
  winner: GameSide;
  loser: GameSide;
  moves: string[];
  date: Date;
}
