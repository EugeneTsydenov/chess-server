import { IGame } from './IGame';
import { GameSide } from '@common/types';

class GameEntity implements IGame {
  blackPlayer: bigint;
  date: Date;
  id: bigint;
  loser: GameSide;
  moves: string[];
  whitePlayer: bigint;
  winner: GameSide;
}
