import { UseCase } from '@common/types';
import { GetMeUseCaseInputDto } from '../dto/get-me-use-case-input.dto';
import { GetMeUseCaseOutputDto } from '../dto/get-me-use-case-output.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../user.repository';

@Injectable()
export class GetMeUseCase
  implements UseCase<GetMeUseCaseInputDto, GetMeUseCaseOutputDto>
{
  constructor(private userRepository: UserRepository) {}

  async execute(input: GetMeUseCaseInputDto): Promise<GetMeUseCaseOutputDto> {
    const user = await this.userRepository.getUserById(input.userId);

    if (!user) {
      throw new NotFoundException({ message: 'User not found!' });
    }

    return new GetMeUseCaseOutputDto(user);
  }
}
