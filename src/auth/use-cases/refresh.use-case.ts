import { UseCase } from '@common/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../services/token.service';
import { RefreshUseCaseInputDto } from '../dto/refresh-use-case-input.dto';
import { RefreshUseCaseOutputDto } from '../dto/refresh-use-case-output.dto';
import { AuthRepository } from '../auth.repository';
import { UserRepository } from '@src/user';
import { SaveTokenRepositoryDto } from '../dto/save-token-repository.dto';

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

    await this.authRepository.deleteByUserId(token.userId);

    await this.authRepository.saveInvalidToken(token.jti);

    const parsedAccessToken = this.tokenService.parseToken(input.accessToken);

    const invalidAccessToken = await this.authRepository.getInvalidToken(
      parsedAccessToken.jti,
    );

    if (!invalidAccessToken) {
      await this.authRepository.saveInvalidToken(parsedAccessToken.jti);
    }

    const { access, refresh } = await this.tokenService.generatePairOfTokens(
      user.id,
    );

    await this.authRepository.save(
      new SaveTokenRepositoryDto({
        userId: user.id,
        jti: refresh.jti,
      }),
    );

    return new RefreshUseCaseOutputDto({
      message: 'Successfully refreshed!',
      refreshToken: refresh.token,
      access: {
        token: access.token,
        tokenType: 'Bearer',
      },
    });
  }
}
