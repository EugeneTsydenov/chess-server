import { HttpException, Injectable } from '@nestjs/common';
import { ITokenService, IPairOfTokens } from './ITokenService';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import * as process from 'node:process';

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
        expiresIn: '15m',
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
      console.log(err);
      throw new HttpException(
        { message: 'Something went wrong!', errors: [] },
        500,
      );
    }
  }

  verifyAccessToken(accessToken: string): void {}

  verifyRefreshToken(refreshToken: string): void {}
}
