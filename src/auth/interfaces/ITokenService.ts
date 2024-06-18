import { IJwtPayload } from '../models/IJwtPayload';

export interface ITokenService {
  generatePairOfTokens(id: number): Promise<IPairOfTokens>;
  verifyRefreshToken(refreshToken: string): IJwtPayload;
  verifyAccessToken(accessToken: string): IJwtPayload;
  parseToken(token: string): IJwtPayload;
}

export interface IToken {
  token: string;
  jti: string;
}

export interface IPairOfTokens {
  access: IToken;
  refresh: IToken;
}
