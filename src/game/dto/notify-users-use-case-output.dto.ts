export class NotifyUsersUseCaseOutputDto {
  socketId1: string;
  socketId2: string;

  constructor(input: { socketId1: string; socketId2: string }) {
    this.socketId1 = input.socketId1;
    this.socketId2 = input.socketId2;
  }
}
