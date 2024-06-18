export class ChangeTokenRepositoryInputDto {
  userId: number;
  newJti: string;

  constructor(input: { userId: number; newJti: string }) {
    this.userId = input.userId;
    this.newJti = input.newJti;
  }
}
