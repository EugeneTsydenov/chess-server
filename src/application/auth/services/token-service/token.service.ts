import { Injectable } from '@nestjs/common';
import { ITokenService, IPairOfTokens } from './ITokenService';

@Injectable()
export class TokenService implements ITokenService {
  generatePairOfTokens(id: number): IPairOfTokens {
    return undefined;
  }

  verifyAccessToken(accessToken: string): void {}

  verifyRefreshToken(refreshToken: string): void {}
}
