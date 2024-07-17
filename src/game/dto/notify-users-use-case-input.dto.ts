export class NotifyUsersUseCaseInputDto {
  roomId: string;

  constructor(input: { roomId: string }) {
    this.roomId = input.roomId;
  }
}
