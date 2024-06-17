import { UserEntity } from '../entities/user.entity';
import { SaveUserRepositoryDto } from '../dto/saveUserRepository.dto';

export interface IUserRepository {
  getUserById(id: number): Promise<UserEntity>;
  deleteUser(id: number): any;
  updateUser(id: number): any;
  saveUser(userData: SaveUserRepositoryDto): Promise<UserEntity>;
  getUserByUsername(username: string): Promise<UserEntity>;
}
