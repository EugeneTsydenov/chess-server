export class CancelGameSearchInputDto {
  userId: number;

  constructor(input: { userId: number }) {
    this.userId = input.userId;
  }
}
