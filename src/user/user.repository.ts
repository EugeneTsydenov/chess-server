import { IUserRepository } from './interfaces/IUserRepository';
import { Database } from '@frameworks/database';
import { HttpException, Injectable } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { SaveUserRepositoryDto } from './dto/save-user-repository.dto';
import { UpdateUserRepositoryDto } from './dto/update-user-repository.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private db: Database) {}
  deleteUser(): any {}

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

  async getUserById(id: number): Promise<UserEntity> {
    try {
      const user = await this.db.user.findFirst({
        where: {
          id: id,
        },
      });
      return user ? new UserEntity(user) : null;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        { message: 'Something went wrong!', error: [] },
        500,
      );
    }
  }

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

  async updateUser(input: UpdateUserRepositoryDto): Promise<UserEntity> {
    try {
      const user = await this.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          ...input.updatedFields,
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
