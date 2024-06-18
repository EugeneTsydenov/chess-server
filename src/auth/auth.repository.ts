import { Database } from '@frameworks/database';
import { HttpException, Injectable } from '@nestjs/common';
import { IAuthRepository } from './interfaces/IAuthRepository';
import { AuthEntity } from './entities/auth.entity';
import { SaveTokenRepositoryDto } from './dto/saveTokenRepository.dto';
import { ChangeTokenRepositoryInputDto } from './dto/changeTokenRepositoryInput.dto';
import { IInvalidToken } from './models/IInvalidToken';

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
      throw new HttpException(
        { message: 'Something went wrong!', error: [] },
        500,
      );
    }
  }

  async getTokenByUserId(userId: number): Promise<AuthEntity> {
    try {
      const token = await this.db.token.findFirst({
        where: {
          user_id: userId,
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

  async deleteByUserId(userId: number): Promise<any> {
    try {
      await this.db.token.delete({
        where: {
          user_id: userId,
        },
      });
    } catch (e) {
      throw new HttpException(
        { message: 'Something went wrong!', error: [] },
        500,
      );
    }
  }

  async saveInvalidToken(jti: string): Promise<void> {
    try {
      await this.db.invalidToken.create({
        data: {
          jti,
        },
      });
    } catch (e) {
      throw new HttpException(
        { message: 'Something went wrong!', error: [] },
        500,
      );
    }
  }

  async getInvalidToken(jti: string): Promise<IInvalidToken> {
    try {
      return await this.db.invalidToken.findFirst({
        where: {
          jti,
        },
      });
    } catch (e) {
      throw new HttpException(
        { message: 'Something went wrong!', error: [] },
        500,
      );
    }
  }
}
