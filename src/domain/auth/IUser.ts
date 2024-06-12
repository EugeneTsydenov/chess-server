export interface IUser {
  id: bigint;
  username: string;
  email: string;
  password: string;
  display_name: string;
  avatar: string;
  created_at: Date;
  updated_at: Date;
  rating: number;
  games: number;
  wins: number;
  losses: number;
  draws: number;
}
