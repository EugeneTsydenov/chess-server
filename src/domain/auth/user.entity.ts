import { IUser } from './IUser';

export class UserEntity implements IUser {
  id: bigint;
  username: string;
  avatar: string;
  draws: number;
  games: number;
  losses: number;
  password: string;
  rating: number;
  wins: number;
  email: string;
  createdAt: Date;
  displayName: string;
  updatedAt: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.username = user.username;
    this.avatar = user.avatar;
    this.draws = user.draws;
    this.games = user.games;
    this.losses = user.losses;
    this.password = user.password;
    this.rating = user.rating;
    this.wins = user.wins;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.displayName = user.displayName;
  }
}
