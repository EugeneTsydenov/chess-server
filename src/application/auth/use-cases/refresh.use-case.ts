import { UseCase } from '@common/types';
import {
  ChangeTokenRepositoryInputDto,
  RefreshUseCaseInputDto,
} from '@application/auth';
import { RefreshUseCaseOutputDto } from '@application/auth/dto/refreshUseCaseOutput.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '@common/services';
import { AuthRepository } from '@infrastructure/auth';
import { UserRepository } from '@infrastructure/user';

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

    const payload = await this.tokenService.verifyRefreshToken(
      input.refreshToken,
    );

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

    const { access, refresh } = await this.tokenService.generatePairOfTokens(
      user.id,
    );

    await this.authRepository.changeToken(
      new ChangeTokenRepositoryInputDto({
        userId: user.id,
        newJti: refresh.jti,
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
