import { UserEntity } from '../entities/user.entity';
import { SaveUserRepositoryDto } from '../dto/save-user-repository.dto';
import { UpdateUserRepositoryDto } from '../dto/update-user-repository.dto';

export interface IUserRepository {
  getUserById(id: number): Promise<UserEntity>;
  deleteUser(id: number): any;
  saveUser(userData: SaveUserRepositoryDto): Promise<UserEntity>;
  getUserByUsername(username: string): Promise<UserEntity>;
  updateUser(input: UpdateUserRepositoryDto): Promise<UserEntity>;
}
