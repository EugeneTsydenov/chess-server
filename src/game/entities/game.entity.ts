import { IGame } from '../models/IGame';
import { GameSide } from '@common/types';

export class GameEntity implements IGame {
  blackPlayer: number;
  date: Date;
  id: number;
  loser: GameSide;
  moves: string[];
  whitePlayer: number;
  winner: GameSide;
  type: 'friend' | 'random';
  isRating: boolean;
}
