export interface IUserFromDb {
  id: number;
  username: string;
  avatar: string | null;
  draws: number;
  games: number;
  losses: number;
  password: string;
  rating: number;
  wins: number;
  email: string;
  created_at: Date;
  display_name: string;
  avatar_background_color: string | null;
  updated_at: Date;
}
