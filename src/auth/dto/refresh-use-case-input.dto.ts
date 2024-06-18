export class RefreshUseCaseInputDto {
  refreshToken: string;
  accessToken: string;

  constructor(refreshToken: string, accessToken: string) {
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
  }
}
