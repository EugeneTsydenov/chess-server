import { IAuthController } from './IAuthController';
import { Body, Controller, Next, Post, Res } from '@nestjs/common';
import {
  ILoginInput,
  IRegisterInput,
  LoginUseCase,
  LoginUseCaseInputDto,
  RegisterUseCase,
  RegisterUseCaseInputDto,
} from '@application/auth';
import { concat, delay, from, map } from 'rxjs';
import { NextFunction, Response } from 'express';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUseCase,
  ) {}
  @Post('login')
  async login(
    @Body() body: ILoginInput,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const transformedBody = new LoginUseCaseInputDto(body);
      const loginUseCase = await this.loginUseCase.execute(transformedBody);
      res.cookie('refreshToken', loginUseCase.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      res.json({ message: loginUseCase.message, access: loginUseCase.access });
    } catch (e) {
      next(e);
    }
  }

  @Post('logout')
  async logout(userData: any) {
    concat(from('1').pipe(delay(1000)), from('2'), from('3')).pipe(
      map((r) => {
        console.log(r);
      }),
    );
  }

  @Post('refresh')
  async refresh() {
    from('refresh');
  }

  @Post('register')
  async register(
    @Body() body: IRegisterInput,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      const transformedBody = new RegisterUseCaseInputDto(body);
      const registerUseCase =
        await this.registerUseCase.execute(transformedBody);
      res.json(registerUseCase);
    } catch (e) {
      next(e);
    }
  }
}
