import { ILoginInput } from '../models/ILoginInput';

export class LoginUseCaseInputDto {
  username: string;
  password: string;
  rememberMe: boolean;

  constructor(input: ILoginInput) {
    this.username = input.username;
    this.password = input.password;
    this.rememberMe = input.rememberMe;
  }
}
