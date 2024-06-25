import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IToken, ITokenService } from '../interfaces/ITokenService';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { IJwtPayload } from '../models/IJwtPayload';
@Injectable()
export class TokenService implements ITokenService {
  constructor(private jwtService: JwtService) {}

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

  generateAccessToken(id: number): IToken {
    try {
      const jti = uuidv4();
      return {
        token: this.jwtService.sign(
          { id },
          {
            privateKey: process.env.ACCESS_SECRET_KEY,
            jwtid: jti,
            expiresIn: '15m',
          },
        ),
        jti: jti,
      };
    } catch (err) {
      throw new HttpException(
        { message: 'Something went wrong!', errors: [] },
        500,
      );
    }
  }

  generateRefreshToken(id: number, rememberMe: boolean): IToken {
    try {
      const jti = uuidv4();
      return rememberMe
        ? {
            token: this.jwtService.sign(
              { id },
              {
                privateKey: process.env.REFRESH_SECRET_KEY,
                jwtid: jti,
              },
            ),
            jti: jti,
          }
        : {
            token: this.jwtService.sign(
              { id },
              {
                privateKey: process.env.REFRESH_SECRET_KEY,
                jwtid: jti,
                expiresIn: '30d',
              },
            ),
            jti: jti,
          };
    } catch (err) {
      throw new HttpException(
        { message: 'Something went wrong!', errors: [] },
        500,
      );
    }
  }
}
