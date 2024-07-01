export class SaveUserRepositoryDto {
  display_name: string;
  email: string;
  password: string;
  username: string;
  avatar_background_color: string;

  constructor(input: {
    username: string;
    email: string;
    hashPassword: string;
    displayName: string;
    avatarBackgroundColor: string;
  }) {
    this.display_name = input.displayName;
    this.email = input.email;
    this.password = input.hashPassword;
    this.username = input.username;
    this.avatar_background_color = input.avatarBackgroundColor;
  }
}
