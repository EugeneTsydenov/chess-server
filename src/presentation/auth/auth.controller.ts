import { IAuthController } from './IAuthController';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase } from '@application/auth';
@Controller('auth')
export class AuthController implements IAuthController {
  constructor(private loginUseCase: LoginUseCase) {}
  @Post('login')
  login(@Body() userData: any): any {
    return this.loginUseCase.execute();
  }

  @Post('logout')
  logout(userData: any): any {
    return 'logout';
  }

  @Post('refresh')
  refresh(userData: any): any {
    return 'refresh';
  }

  @Post('register')
  register(userData: any): any {
    return 'register';
  }
}
