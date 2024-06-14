import { UseCase } from '@common/types';
import { RegisterUseCaseInputDto } from '@application/auth';
import { SaveUserRepositoryDto } from '@application/user';
import {
  concat,
  concatMap,
  EMPTY,
  from,
  map,
  Observable,
  throwError,
} from 'rxjs';
import { RegisterUseCaseOutputDto } from '@application/auth/dto/registerUseCaseOutput.dto';
import { UserRepository } from '@infrastructure/user';
import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUseCase
  implements UseCase<RegisterUseCaseInputDto, RegisterUseCaseOutputDto>
{
  constructor(private userRepository: UserRepository) {}

  execute(
    userInput: RegisterUseCaseInputDto,
  ): Observable<RegisterUseCaseOutputDto> {
    const checkUserExistenceObservable = this.userRepository
      .getUserByUsername(userInput.username)
      .pipe(
        concatMap((res) => {
          if (res) {
            return throwError(
              new HttpException(
                { message: 'User already exists!', errors: [] },
                409,
              ),
            );
          }
          return EMPTY;
        }),
      );

    const hashPasswordObservable = from(
      bcrypt.hash(userInput.password, 10),
    ).pipe(
      concatMap((hashPassword) => {
        return this.userRepository.saveUser(
          new SaveUserRepositoryDto({
            username: userInput.username,
            hashPassword: hashPassword,
            displayName: userInput.displayName,
            email: userInput.email,
          }),
        );
      }),
    );

    return concat(checkUserExistenceObservable, hashPasswordObservable).pipe(
      map(() => new RegisterUseCaseOutputDto('User successfully registered!')),
    );
  }
}
