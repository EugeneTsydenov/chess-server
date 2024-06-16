export class SaveTokenRepositoryDto {
  jti: string;
  user_id: number;

  constructor(input: { jti: string; userId: number }) {
    this.jti = input.jti;
    this.user_id = input.userId;
  }
}
