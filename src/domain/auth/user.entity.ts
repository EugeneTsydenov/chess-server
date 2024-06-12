import { IUser } from './IUser';

class UserEntity implements IUser {
  id: bigint;
  username: string;
  avatar: string;
  created_at: Date;
  display_name: string;
  draws: number;
  games: number;
  losses: number;
  password: string;
  rating: number;
  updated_at: Date;
  wins: number;
  email: string;
}
