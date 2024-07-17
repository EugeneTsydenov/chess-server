export class GetGameUseCaseInputDto {
  userId: number;
  socketId: string;
  roomId: string;

  constructor(input: { userId: number; socketId: string; roomId: string }) {
    this.userId = input.userId;
    this.roomId = input.roomId;
    this.socketId = input.socketId;
  }
}
