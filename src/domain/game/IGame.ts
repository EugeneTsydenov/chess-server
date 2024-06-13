import { GameSide } from '@common/types';

export interface IGame {
  id: bigint;
  whitePlayer: bigint;
  blackPlayer: bigint;
  winner: GameSide;
  loser: GameSide;
  moves: string[];
  date: Date;
}
