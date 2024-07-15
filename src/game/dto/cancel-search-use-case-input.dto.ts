export class CancelSearchUseCaseInputDto {
  userId: number;
  constructor(input: { userId: number }) {
    this.userId = input.userId;
  }
}
