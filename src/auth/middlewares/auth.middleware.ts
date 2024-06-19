import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '@auth/services/token.service';
import { UserRepository } from '@src/user';
import { AuthRepository } from '@auth/auth.repository';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private tokenService: TokenService,
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
  ) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const accessToken = req.headers.authorization?.split(' ')[1];

      if (!accessToken) {
        next(
          new UnauthorizedException({
            message: 'User is unauthorized!',
            errors: [],
          }),
        );
      }

      const payload = this.tokenService.verifyAccessToken(accessToken);

      if (!payload) {
        next(
          new UnauthorizedException({
            message: 'User is unauthorized!',
            errors: [],
          }),
        );
      }

      const user = await this.userRepository.getUserById(payload.id);

      if (!user) {
        next(
          new UnauthorizedException({
            message: 'User is unauthorized!',
            errors: [],
          }),
        );
      }

      const invalidToken = await this.authRepository.getInvalidToken(
        payload.jti,
      );

      if (invalidToken) {
        next(
          new UnauthorizedException({
            message: 'User is unauthorized!',
            errors: [],
          }),
        );
      }

      req.body = { ...req.body, userId: payload.id };
      next();
    } catch (e) {
      next(e);
    }
  }
}
