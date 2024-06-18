import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IPairOfTokens, ITokenService } from '../interfaces/ITokenService';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as process from 'node:process';
import { IJwtPayload } from '../models/IJwtPayload';

@Injectable()
export class TokenService implements ITokenService {
  constructor(private jwtService: JwtService) {}

  async generatePairOfTokens(id: number): Promise<IPairOfTokens> {
    try {
      const payload = {
        id,
      };

      const accessJti = uuidv4();
      const accessOptions: JwtSignOptions = {
        privateKey: process.env.ACCESS_SECRET_KEY,
        jwtid: accessJti,
        expiresIn: '15m',
      };
      const accessToken = await this.jwtService.signAsync(
        payload,
        accessOptions,
      );

      const refreshJti = uuidv4();
      const refreshOptions: JwtSignOptions = {
        privateKey: process.env.REFRESH_SECRET_KEY,
        jwtid: refreshJti,
        expiresIn: '30d',
      };
      const refreshToken = await this.jwtService.signAsync(
        payload,
        refreshOptions,
      );

      return {
        access: { token: accessToken, jti: accessJti },
        refresh: { token: refreshToken, jti: refreshJti },
      };
    } catch (err) {
      throw new HttpException(
        { message: 'Something went wrong!', errors: [] },
        500,
      );
    }
  }

  verifyAccessToken(accessToken: string): IJwtPayload {
    try {
      return this.jwtService.verify<IJwtPayload>(accessToken, {
        secret: process.env.ACCESS_SECRET_KEY,
      });
    } catch (_) {
      throw new UnauthorizedException({
        message: 'User is unauthorized!',
        errors: [],
      });
    }
  }

  verifyRefreshToken(refreshToken: string): IJwtPayload {
    try {
      return this.jwtService.verify<IJwtPayload>(refreshToken, {
        secret: process.env.REFRESH_SECRET_KEY,
      });
    } catch (_) {
      throw new UnauthorizedException({
        message: 'User is unauthorized!',
        errors: [],
      });
    }
  }

  parseToken(token: string): IJwtPayload {
    return this.jwtService.decode(token);
  }
}
