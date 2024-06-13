import { IAuthController } from './IAuthController';
import { Body, Controller, Post } from '@nestjs/common';
import { LoginUseCase, RegisterUseCase } from '@application/auth';
import { from } from 'rxjs';
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
  refresh(userData: any) {
    return this.registerUseCase.execute();
  }

  @Post('register')
  register(userData: any) {
    return from('register');
  }
}
