import { IUser } from './IUser';

class UserEntity implements IUser {
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
}
