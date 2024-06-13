import { UseCase } from '@common/types';
import { UserRepository } from '@infrastructure/user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginUseCase implements UseCase<string, any> {
  constructor(private userRepository: UserRepository) {}
  execute() {
    return this.userRepository.saveUser();
  }
}
