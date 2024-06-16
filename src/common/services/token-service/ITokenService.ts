import { IJwtPayload } from '@application/auth/model/IJwtPayload';

export interface ITokenService {
  generatePairOfTokens(id: number): Promise<IPairOfTokens>;
  verifyRefreshToken(refreshToken: string): Promise<IJwtPayload>;
  verifyAccessToken(accessToken: string): Promise<IJwtPayload>;
}

export interface IToken {
  token: string;
  jti: string;
}

export interface IPairOfTokens {
  access: IToken;
  refresh: IToken;
}
