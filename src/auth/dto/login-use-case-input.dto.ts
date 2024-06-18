import { ILoginInput } from '../models/ILoginInput';

export class LoginUseCaseInputDto {
  username: string;
  password: string;

  constructor(input: ILoginInput) {
    this.username = input.username;
    this.password = input.password;
  }
}
