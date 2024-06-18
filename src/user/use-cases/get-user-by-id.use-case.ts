import { UseCase } from '@common/types';
import { GetUserByIdUseCaseInputDto } from '../dto/get-user-by-id-use-case-input.dto';
import { GetUserByIdUseCaseOutputDto } from '../dto/get-user-by-id-use-case-output.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
export class GetUserByIdUseCase
  implements UseCase<GetUserByIdUseCaseInputDto, GetUserByIdUseCaseOutputDto>
{
  constructor(private userRepository: UserRepository) {}
  async execute(
    input: GetUserByIdUseCaseInputDto,
  ): Promise<GetUserByIdUseCaseOutputDto> {
    const user = await this.userRepository.getUserById(input.id);
    if (!user) {
      throw new NotFoundException({ message: 'User not found!' });
    }

    return new GetUserByIdUseCaseOutputDto(user);
  }
}
