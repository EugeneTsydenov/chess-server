import { Database } from '@frameworks/database';
import { IAuthRepository } from './IAuthRepository';
import {
  ChangeTokenRepositoryInputDto,
  SaveTokenRepositoryDto,
} from '@application/auth';
import { AuthEntity } from '@domain/auth';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(private db: Database) {}

  delete(): any {}

  async getTokenByJti(jti: string): Promise<AuthEntity> {
    try {
      const token = await this.db.token.findFirst({
        where: {
          jti: jti,
        },
      });
      return token ? new AuthEntity(token) : null;
    } catch (e) {
      throw new HttpException(
        { message: 'Something went wrong!', error: [] },
        500,
      );
    }
  }

  async save(input: SaveTokenRepositoryDto): Promise<AuthEntity> {
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

  async changeToken(input: ChangeTokenRepositoryInputDto): Promise<AuthEntity> {
    try {
      const token = await this.db.token.update({
        where: {
          user_id: input.userId,
        },
        data: {
          jti: input.newJti,
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
