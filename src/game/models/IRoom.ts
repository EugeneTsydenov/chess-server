import { Chess } from 'chess.js';

export interface IRoom {
  roomId: string;
  game: Chess | null;
  player1: IRoomPlayer;
  player2: IRoomPlayer | null;
  isRating: boolean;
  isStartGame: boolean;
  timeMode:
    | '1 | 0'
    | '1 | 1'
    | '2 | 1'
    | '3 | 0'
    | '3 | 2'
    | '5 | 0'
    | '10 | 0'
    | '15 | 10'
    | '30 | 0';
  watchers: number;
}

interface IRoomPlayer {
  id: number;
  side: 'white' | 'black' | null;
  socketId: string;
}
