export class SaveUserRepositoryDto {
  display_name: string;
  email: string;
  password: string;
  username: string;

  constructor(input: {
    username: string;
    email: string;
    hashPassword: string;
    displayName: string;
  }) {
    this.display_name = input.displayName;
    this.email = input.email;
    this.password = input.hashPassword;
    this.username = input.username;
  }
}
