import { UseCase } from '@common/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../services/token.service';
import { RefreshUseCaseInputDto } from '../dto/refreshUseCaseInput.dto';
import { RefreshUseCaseOutputDto } from '../dto/refreshUseCaseOutput.dto';
import { AuthRepository } from '../auth.repository';
import { ChangeTokenRepositoryInputDto } from '../dto/changeTokenRepositoryInput.dto';
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
