import { UseCase } from '@common/types';

export class LoginUseCase implements UseCase<string, number> {
  execute(word: string) {
    console.log(word);
    return 1;
  }
}
