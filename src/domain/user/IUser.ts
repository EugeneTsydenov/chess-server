export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  displayName: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  games: number;
  wins: number;
  losses: number;
  draws: number;
}
