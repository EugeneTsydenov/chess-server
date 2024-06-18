import { UseCase } from '@common/types';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from '@auth/auth.repository';
import { TokenService } from '@auth/services/token.service';

@Injectable()
export class LogoutUseCase
  implements UseCase<{ accessToken: string; refreshToken: string }, void>
{
  constructor(
    private authRepository: AuthRepository,
    private tokenService: TokenService,
  ) {}

  async execute(tokens: {
    accessToken: string;
    refreshToken: string;
  }): Promise<void> {
    const parsedAccessToken = this.tokenService.parseToken(tokens.accessToken);
    const parsedRefreshToken = this.tokenService.parseToken(
      tokens.refreshToken,
    );

    await this.authRepository.deleteByUserId(parsedRefreshToken.id);

    await this.authRepository.saveInvalidToken(parsedAccessToken.jti);
    await this.authRepository.saveInvalidToken(parsedRefreshToken.jti);
  }
}
