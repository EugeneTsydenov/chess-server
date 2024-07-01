import { UseCase } from '@common/types';
import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUseCaseOutputDto } from '../dto/register-use-case-output.dto';
import { RegisterUseCaseInputDto } from '../dto/register-use-case-input.dto';
import { SaveUserRepositoryDto } from '@src/user';
import { UserRepository } from '@src/user';
import ColorHash from 'color-hash-ts';

@Injectable()
export class RegisterUseCase
  implements UseCase<RegisterUseCaseInputDto, RegisterUseCaseOutputDto>
{
  constructor(private userRepository: UserRepository) {}

  async execute(
    userInput: RegisterUseCaseInputDto,
  ): Promise<RegisterUseCaseOutputDto> {
    const errors: { field: string; message: string }[] = [];

    const isUsernameExist = await this.userRepository.getUserByField(
      'username',
      userInput.username,
    );

    if (isUsernameExist) {
      errors.push({
        message: 'User with this username already exists!',
        field: 'username',
      });
    }

    const isDisplayNameExist = await this.userRepository.getUserByField(
      'display_name',
      userInput.displayName,
    );

    if (isDisplayNameExist) {
      errors.push({
        message: 'User with this display name already exists!',
        field: 'displayName',
      });
    }

    const isEmailExist = await this.userRepository.getUserByField(
      'email',
      userInput.email,
    );

    if (isEmailExist) {
      errors.push({
        message: 'User with this email already exists!',
        field: 'email',
      });
    }

    if (errors.length > 0) {
      throw new HttpException({ message: 'User already exist!', errors }, 409);
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 10);

    const colorHash = new ColorHash();

    await this.userRepository.saveUser(
      new SaveUserRepositoryDto({
        username: userInput.username,
        hashPassword: hashedPassword,
        displayName: userInput.displayName,
        email: userInput.email,
        avatarBackgroundColor: colorHash.hex(userInput.displayName),
      }),
    );

    return new RegisterUseCaseOutputDto(
      'You have successfully entered the system! Now log in...',
    );
  }
}
