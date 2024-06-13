export interface ITokenService {
  generatePairOfTokens(id: number): IPairOfTokens;
  verifyRefreshToken(refreshToken: string): void;
  verifyAccessToken(accessToken: string): void;
}

export interface IPairOfTokens {
  accessToken: string;
  refreshToken: string;
}
