import { IAuthController } from './IAuthController';
import {
  Body,
  Controller,
  HttpException,
  Next,
  Post,
  Res,
} from '@nestjs/common';
import {
  IRegisterUserInput,
  LoginUseCase,
  RegisterUseCase,
  RegisterUseCaseInputDto,
} from '@application/auth';
import { catchError, EMPTY, from } from 'rxjs';
import { NextFunction, Response } from 'express';
@Controller('auth')
export class AuthController implements IAuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUseCase,
  ) {}
  @Post('login')
  login(@Body() userData: any) {
    return this.loginUseCase.execute();
  }

  @Post('logout')
  logout(userData: any) {
    return from('logout');
  }

  @Post('refresh')
  refresh() {
    return from('refresh');
  }

  @Post('register')
  register(
    @Body() userInput: IRegisterUserInput,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): any {
    const transformedUserInput = new RegisterUseCaseInputDto(userInput);
    this.registerUseCase
      .execute(transformedUserInput)
      .pipe(
        catchError((err) => {
          next(err);
          return EMPTY;
        }),
      )
      .subscribe((r) => {
        res.json(r);
      });
  }
}
