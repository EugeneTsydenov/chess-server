import { UserEntity } from '@domain/user';
import { SaveUserRepositoryDto } from '@application/user';

export interface IUserRepository {
  getUserById(id: number): any;
  deleteUser(id: number): any;
  updateUser(id: number): any;
  saveUser(userData: SaveUserRepositoryDto): Promise<UserEntity>;
  getUserByUsername(username: string): Promise<UserEntity>;
}
