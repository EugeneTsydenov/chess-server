import { Injectable, CanActivate } from '@nestjs/common';
import { TokenService } from '@auth/services/token.service';
import { UserRepository } from '@src/user';
import { AuthRepository } from '@auth/auth.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
  ) {}

  async canActivate(context: any): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const accessToken = context.args[0].handshake.auth.accessToken;

    if (!accessToken) {
      client.emit('error', { message: 'User is not authorized!', status: 401 });
      return false;
    }

    try {
      const payload = this.tokenService.verifyAccessToken(accessToken);
      if (!payload) {
        client.emit('error', {
          message: 'User is not authorized!',
          status: 401,
        });
        return false;
      }

      const user = await this.userRepository.getUserById(payload.id);
      if (!user) {
        client.emit('error', {
          message: 'User is not authorized!',
          status: 401,
        });
        return false;
      }

      const invalidToken = await this.authRepository.getInvalidToken(
        payload.jti,
      );
      if (invalidToken) {
        client.emit('error', {
          message: 'User is not authorized!',
          status: 401,
        });
        return false;
      }
      context.switchToWs().getData().userId = payload.id;

      return true;
    } catch (e) {
      client.emit('error', { message: 'User is not authorized!', status: 401 });
      return false;
    }
  }
}
