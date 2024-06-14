export interface IUserFromDb {
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
  created_at: Date;
  display_name: string;
  updated_at: Date;
}
