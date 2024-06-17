import { Database } from '@frameworks/database';
import { HttpException, Injectable } from '@nestjs/common';
import { IAuthRepository } from './interfaces/IAuthRepository';
import { AuthEntity } from './entities/auth.entity';
import { SaveTokenRepositoryDto } from './dto/saveTokenRepository.dto';
import { ChangeTokenRepositoryInputDto } from './dto/changeTokenRepositoryInput.dto';

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
