import { ILoginInput } from '@application/auth';

export class LoginUseCaseInputDto {
  username: string;
  password: string;

  constructor(input: ILoginInput) {
    this.username = input.username;
    this.password = input.password;
  }
}
