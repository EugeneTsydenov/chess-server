import { IJwtPayload } from '../models/IJwtPayload';

export interface ITokenService {
  verifyRefreshToken(refreshToken: string): IJwtPayload;
  verifyAccessToken(accessToken: string): IJwtPayload;
  parseToken(token: string): IJwtPayload;
  generateAccessToken(id: number): IToken;
  generateRefreshToken(id: number, rememberMe: boolean): IToken;
}

export interface IToken {
  token: string;
  jti: string;
}

export interface IPairOfTokens {
  access: IToken;
  refresh: IToken;
}
