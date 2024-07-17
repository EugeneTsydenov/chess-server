import { GameRoles, GameSides } from '@src/game/types';

export class GetGameUseCaseOutputDto {
  role: GameRoles;
  side: GameSides;
  game: {
    fen: string;
    moves: string[];
    turn: GameSides;
    isGameOver: boolean;
    winner: GameSides | null;
    loser: GameSides | null;
    cause: string | null;
  };
  enemy: number | null;
  player1: IPlayer;
  player2: IPlayer;

  constructor(input: {
    role: GameRoles;
    side: GameSides;
    game: {
      fen: string;
      moves: string[];
      turn: GameSides;
      isGameOver: boolean;
      winner: GameSides | null;
      loser: GameSides | null;
      cause: string | null;
    };
    enemy: number | null;
    player1: IPlayer;
    player2: IPlayer;
  }) {
    this.enemy = input.enemy;
    this.role = input.role;
    this.game = input.game;
    this.player1 = input.player1;
    this.player2 = input.player2;
    this.side = input.side;
  }
}

interface IPlayer {
  side: GameSides;
  id: number;
}
