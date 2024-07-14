export class FindGameUseCaseOutputDto {
  roomId: string;
  isFindGame: boolean;

  constructor(input: { roomId: string; isFindGame: boolean }) {
    this.roomId = input.roomId;
    this.isFindGame = input.isFindGame;
  }
}
