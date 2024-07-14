export interface IRoom {
  roomId: string;
  fen: string | null;
  player1: IRoomPlayer;
  player2: IRoomPlayer | null;
  isRating: boolean;
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
}

interface IRoomPlayer {
  id: number;
  side: 'white' | 'black' | null;
}
