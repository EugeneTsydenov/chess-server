import { UseCase } from '@common/types';
import { UpdateMeUseCaseInputDto } from '@src/user/dto/update-me-use-case-input.dto';
import { UpdateMeUseCaseOutputDto } from '@src/user/dto/update-me-use-case-output.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user.repository';
import * as bcrypt from 'bcrypt';
import { UpdateUserRepositoryDto } from '../dto/update-user-repository.dto';

@Injectable()
export class UpdateMeUseCase
  implements UseCase<UpdateMeUseCaseInputDto, UpdateMeUseCaseOutputDto>
{
  constructor(private userRepository: UserRepository) {}

  async execute(
    input: UpdateMeUseCaseInputDto,
  ): Promise<UpdateMeUseCaseOutputDto> {
    const isHaveConfidentialFields = input.isHaveConfidentialFields;
    const updatedFields = input.updatedFields;

    if (isHaveConfidentialFields) {
      const confirmedPassword = input.confirmedPassword;
      if (!confirmedPassword) {
        throw new BadRequestException({
          message: 'Password is required!',
          errors: [],
        });
      }

      const user = await this.userRepository.getUserById(input.userId);

      if (!(await bcrypt.compare(input.confirmedPassword, user.password))) {
        throw new UnauthorizedException({
          message: 'User is unauthorized!',
          errors: [],
        });
      }

      const updatedUser = await this.userRepository.updateUser(
        new UpdateUserRepositoryDto({
          id: input.userId,
          updatedFields: {
            username: updatedFields.username,
            email: updatedFields.email,
            password: updatedFields.password,
            display_name: updatedFields.displayName,
            avatar: updatedFields.avatar,
            updated_at: new Date(),
          },
        }),
      );

      return new UpdateMeUseCaseOutputDto(updatedUser);
    }

    const confidentialFields = ['email', 'password', 'username'];

    for (const field in updatedFields) {
      if (confidentialFields.includes(field)) {
        throw new UnauthorizedException({
          message:
            'Confidential field cannot be changed without password confirmation!',
          errors: [],
        });
      }
    }

    const updatedUser = await this.userRepository.updateUser(
      new UpdateUserRepositoryDto({
        id: input.userId,
        updatedFields: {
          display_name: updatedFields.displayName,
          avatar: updatedFields.avatar,
          updated_at: new Date(),
        },
      }),
    );

    return new UpdateMeUseCaseOutputDto(updatedUser);
  }
}
