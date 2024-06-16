import { Database } from '@frameworks/database';
import { IAuthRepository } from './IAuthRepository';
import { SaveTokenRepositoryDto } from '@application/auth';
import { AuthEntity } from '@domain/auth';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private db: Database) {}

  delete(): any {}

  async get() {}

  async save(input: SaveTokenRepositoryDto): Promise<AuthEntity> {
    console.log(input);
    try {
      const token = await this.db.token.create({
        data: {
          ...input,
        },
      });
      return new AuthEntity(token);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        { message: 'Something went wrong!', error: [] },
        500,
      );
    }
  }
}
