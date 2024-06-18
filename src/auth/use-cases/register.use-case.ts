import { UseCase } from '@common/types';
import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUseCaseOutputDto } from '../dto/register-use-case-output.dto';
import { RegisterUseCaseInputDto } from '../dto/register-use-case-input.dto';
import { SaveUserRepositoryDto } from '@src/user';
import { UserRepository } from '@src/user';

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
