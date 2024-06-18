import { IAccess } from '../models/IAccess';

export class LoginUseCaseOutputDto {
  message: string;
  access: IAccess;
  refreshToken: string;

  constructor(input: {
    message: string;
    access: IAccess;
    refreshToken: string;
  }) {
    this.message = input.message;
    this.access = input.access;
    this.refreshToken = input.refreshToken;
  }
}
