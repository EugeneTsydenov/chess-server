import { UseCase } from '@common/types';
import { UserRepository } from '@infrastructure/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginUseCase implements UseCase<string, number> {
  constructor(private userRepository: UserRepository) {}
  async execute() {
    await this.userRepository.saveUser();
    return 1;
  }
}
