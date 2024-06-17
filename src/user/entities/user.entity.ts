import { IUser } from '../models/IUser';
import { IUserFromDb } from '../models/IUserFromDb';

export class UserEntity implements IUser {
  id: number;
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

  constructor(user: IUserFromDb) {
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
    this.createdAt = user.created_at;
    this.updatedAt = user.updated_at;
    this.displayName = user.display_name;
  }
}
