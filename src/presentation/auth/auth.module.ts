import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import {
  LoginUseCase,
  RefreshUseCase,
  RegisterUseCase,
} from '@application/auth';
import { UserRepository } from '@infrastructure/user';
import { JwtService } from '@nestjs/jwt';
import { Database } from '@frameworks/database';
import { TokenService } from '@common/services';
import { AuthRepository } from '@infrastructure/auth';

@Module({
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    RegisterUseCase,
    UserRepository,
    JwtService,
    TokenService,
    Database,
    AuthRepository,
    RefreshUseCase,
  ],
})
export class AuthModule {}
