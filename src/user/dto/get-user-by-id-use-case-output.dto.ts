import { UserEntity } from '../entities/user.entity';

export class GetUserByIdUseCaseOutputDto {
  id: number;
  displayName: string;
  avatar: string;
  rating: number | null;
  avatarBackgroundColor: string | null;

  constructor(input: UserEntity) {
    this.id = input.id;
    this.displayName = input.displayName;
    this.avatar = input.avatar;
    this.rating = input.rating;
    this.avatarBackgroundColor = input.avatarBackgroundColor;
  }
}
