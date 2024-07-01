import { UseCase } from '@common/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../services/token.service';
import { RefreshUseCaseInputDto } from '../dto/refresh-use-case-input.dto';
import { RefreshUseCaseOutputDto } from '../dto/refresh-use-case-output.dto';
import { AuthRepository } from '../auth.repository';
import { UserRepository } from '@src/user';

@Injectable()
export class RefreshUseCase
  implements UseCase<RefreshUseCaseInputDto, RefreshUseCaseOutputDto>
{
  constructor(
    private tokenService: TokenService,
    private authRepository: AuthRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(
    input: RefreshUseCaseInputDto,
  ): Promise<RefreshUseCaseOutputDto> {
    if (!input.refreshToken) {
      throw new UnauthorizedException({
        message: 'User is unauthorized',
        errors: [],
      });
    }

    const payload = this.tokenService.verifyRefreshToken(input.refreshToken);

    const user = await this.userRepository.getUserById(payload.id);

    if (!user) {
      throw new UnauthorizedException({
        message: 'User is unauthorized!',
        errors: [],
      });
    }

    const token = await this.authRepository.getTokenByJti(payload.jti);

    if (!token) {
      throw new UnauthorizedException({
        message: 'User is unauthorized!',
        errors: [],
      });
    }

    if (token.userId !== user.id) {
      throw new UnauthorizedException({
        message: 'User is unauthorized!',
        errors: [],
      });
    }

    const invalidToken = await this.authRepository.getInvalidToken(token.jti);

    if (invalidToken) {
      throw new UnauthorizedException({
        message: 'User is unauthorized!',
        errors: [],
      });
    }

    if (input.accessToken) {
      const parsedAccessToken = this.tokenService.parseToken(input.accessToken);

      const invalidAccessToken = await this.authRepository.getInvalidToken(
        parsedAccessToken?.jti,
      );

      if (!invalidAccessToken) {
        await this.authRepository.saveInvalidToken(parsedAccessToken.jti);
      }
    }

    const access = this.tokenService.generateAccessToken(user.id);

    return new RefreshUseCaseOutputDto({
      message: 'Successfully refreshed!',
      refreshToken: input.refreshToken,
      access: {
        token: access.token,
        tokenType: 'Bearer',
      },
    });
  }
}
