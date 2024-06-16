import { UseCase } from '@common/types';
import { RegisterUseCaseInputDto } from '@application/auth';
import { SaveUserRepositoryDto } from '@application/user';
import { RegisterUseCaseOutputDto } from '@application/auth/dto/registerUseCaseOutput.dto';
import { UserRepository } from '@infrastructure/user';
import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUseCase
  implements UseCase<RegisterUseCaseInputDto, RegisterUseCaseOutputDto>
{
  constructor(private userRepository: UserRepository) {}

  async execute(
    userInput: RegisterUseCaseInputDto,
  ): Promise<RegisterUseCaseOutputDto> {
    const user = await this.userRepository.getUserByUsername(
      userInput.username,
    );

    if (user) {
      throw new HttpException(
        { message: 'User already exists!', errors: [] },
        409,
      );
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 10);

    await this.userRepository.saveUser(
      new SaveUserRepositoryDto({
        username: userInput.username,
        hashPassword: hashedPassword,
        displayName: userInput.displayName,
        email: userInput.email,
      }),
    );

    return new RegisterUseCaseOutputDto('User successfully registered!');
  }
}
