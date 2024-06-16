import { IUserRepository } from './IUserRepository';
import { Database } from '@frameworks/database';
import { HttpException, Injectable } from '@nestjs/common';
import { UserEntity } from '@domain/user';
import { SaveUserRepositoryDto } from '@application/user';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private db: Database) {}
  deleteUser(): any {}

  updateUser(): any {}

  async saveUser(userData: SaveUserRepositoryDto): Promise<UserEntity> {
    try {
      const user = await this.db.user.create({
        data: {
          ...userData,
          updated_at: new Date(),
        },
      });
      return new UserEntity(user);
    } catch (e) {
      throw new HttpException(
        { message: 'Something went wrong!', error: [] },
        500,
      );
    }
  }

  getUserById(id: number): any {}

  async getUserByUsername(username: string): Promise<UserEntity> {
    try {
      const user = await this.db.user.findFirst({
        where: {
          username: username,
        },
      });
      return user ? new UserEntity(user) : null;
    } catch (e) {
      throw new HttpException(
        { message: 'Something went wrong!', error: [] },
        500,
      );
    }
  }
}
