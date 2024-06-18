import { IRegisterInput } from '../models/IRegisterInput';

export class RegisterUseCaseInputDto {
  username: string;
  password: string;
  email: string;
  displayName: string;

  constructor(input: IRegisterInput) {
    this.username = input.username;
    this.password = input.password;
    this.email = input.email;
    this.displayName = input.displayName;
  }
}
