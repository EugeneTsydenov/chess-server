import { UseCase } from '@common/types';
import { UserRepository } from '@infrastructure/user';
import { HttpException, Injectable } from '@nestjs/common';
import {
  LoginUseCaseInputDto,
  SaveTokenRepositoryDto,
} from '@application/auth';
import * as bcrypt from 'bcrypt';
import { LoginUseCaseOutputDto } from '@application/auth/dto/loginUseCaseOutput.dto';
import { TokenService } from '@common/services';
import { AuthRepository } from '@infrastructure/auth';

@Injectable()
export class LoginUseCase
  implements UseCase<LoginUseCaseInputDto, LoginUseCaseOutputDto>
{
  constructor(
    private tokenService: TokenService,
    private userRepository: UserRepository,
    private authRepository: AuthRepository,
  ) {}
  async execute(userInput: LoginUseCaseInputDto) {
    const user = await this.userRepository.getUserByUsername(
      userInput.username,
    );

    if (!user) {
      throw new HttpException(
        { message: 'A user with this username does not exist!', errors: [] },
        401,
      );
    }

    if (!(await bcrypt.compare(userInput.password, user.password))) {
      throw new HttpException(
        {
          message: 'Password is invalid!',
          errors: [],
        },
        401,
      );
    }

    const { access, refresh } = await this.tokenService.generatePairOfTokens(
      user.id,
    );

    await this.authRepository.save(
      new SaveTokenRepositoryDto({ jti: refresh.jti, userId: user.id }),
    );

    return new LoginUseCaseOutputDto({
      access: {
        token: access.token,
        tokenType: 'Bearer',
      },
      refreshToken: refresh.token,
      message: 'User successfully login!',
    });
  }
}
