import { IGame } from './IGame';
import { GameColors } from '../../common/types';

class GameEntity implements IGame {
  black_player: bigint;
  date: Date;
  id: bigint;
  loser: GameColors;
  moves: string[];
  white_player: bigint;
  winner: GameColors;
}
