export interface ITokenService {
  generatePairOfTokens(id: number): Promise<IPairOfTokens>;
  verifyRefreshToken(refreshToken: string): void;
  verifyAccessToken(accessToken: string): void;
}

export interface IToken {
  token: string;
  jti: string;
}

export interface IPairOfTokens {
  access: IToken;
  refresh: IToken;
}
