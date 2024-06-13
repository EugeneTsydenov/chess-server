import { IGame } from './IGame';
import { GameSide } from '@common/types';

export class GameEntity implements IGame {
  blackPlayer: bigint;
  date: Date;
  id: bigint;
  loser: GameSide;
  moves: string[];
  whitePlayer: bigint;
  winner: GameSide;
}
