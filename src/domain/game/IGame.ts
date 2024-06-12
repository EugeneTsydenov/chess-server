import { GameColors } from '@common/types';

export interface IGame {
  id: bigint;
  white_player: bigint;
  black_player: bigint;
  winner: GameColors;
  loser: GameColors;
  moves: string[];
  date: Date;
}
