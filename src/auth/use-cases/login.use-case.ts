import { UseCase } from '@common/types';
import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../services/token.service';
import { LoginUseCaseInputDto } from '../dto/login-use-case-input.dto';
import { LoginUseCaseOutputDto } from '../dto/login-use-case-output.dto';
import { AuthRepository } from '../auth.repository';
import { SaveTokenRepositoryDto } from '../dto/save-token-repository.dto';
import { UserRepository } from '@src/user';

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

    const access = this.tokenService.generateAccessToken(user.id);
    const refresh = this.tokenService.generateRefreshToken(
      user.id,
      userInput.rememberMe,
    );

    const token = await this.authRepository.getTokenByUserId(user.id);

    if (token) {
      await this.authRepository.deleteByUserId(user.id);
    }

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
