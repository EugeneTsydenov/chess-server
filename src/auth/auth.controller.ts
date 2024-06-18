import { IAuthController } from './interfaces/IAuthController';
import { Body, Controller, Next, Post, Req, Res } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { LoginUseCase } from './use-cases/login.use-case';
import { RegisterUseCase } from './use-cases/register.use-case';
import { RefreshUseCase } from './use-cases/refresh.use-case';
import { ILoginInput } from './models/ILoginInput';
import { LoginUseCaseInputDto } from './dto/loginUseCaseInput.dto';
import { RefreshUseCaseInputDto } from './dto/refreshUseCaseInput.dto';
import { IRegisterInput } from './models/IRegisterInput';
import { RegisterUseCaseInputDto } from './dto/registerUseCaseInput.dto';
import { ILogoutInput } from '@auth/models/ILogoutInput';

@Controller('auth')
export class AuthController implements IAuthController {
  constructor(
    private loginUseCase: LoginUseCase,
    private registerUseCase: RegisterUseCase,
    private refreshUseCase: RefreshUseCase,
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
  async logout(
    @Body() body: ILogoutInput,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      res.json(body);
    } catch (e) {
      next(e);
    }
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const accessToken = req.headers.authorization.split(' ')[1];
      const refreshUseCase = await this.refreshUseCase.execute(
        new RefreshUseCaseInputDto(refreshToken, accessToken),
      );
      res.cookie('refreshToken', refreshUseCase.refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
      res.json({
        message: refreshUseCase.message,
        access: refreshUseCase.access,
        refresh: refreshUseCase.refreshToken,
      });
    } catch (e) {
      next(e);
    }
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
