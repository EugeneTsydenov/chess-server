export interface IRandomSocket {
  cancelGameSearch(body: { userId: number }, client: any): void;
  move(): void;
  offerDraw(): void;
  giveUp(): void;
  notifyUsers(body: { roomId: string }, client: any): void;
  joinRoom(body: { roomId: string }, client: any): void;
}
