import { IAuthController } from './IAuthController';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController implements IAuthController {
  @Post('login')
  login(@Body() userData: any): any {
    return 'login';
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
