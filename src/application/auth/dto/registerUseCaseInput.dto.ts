import { IRegisterUserInput } from '@application/auth';

export class RegisterUseCaseInputDto {
  username: string;
  password: string;
  email: string;
  displayName: string;

  constructor(input: IRegisterUserInput) {
    this.username = input.username;
    this.password = input.password;
    this.email = input.email;
    this.displayName = input.displayName;
  }
}
