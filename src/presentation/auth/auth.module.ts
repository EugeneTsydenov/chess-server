import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { LoginUseCase, RegisterUseCase } from '@application/auth';
import { UserRepository } from '@infrastructure/user';
import { Database } from '@frameworks/database';

@Module({
  controllers: [AuthController],
  providers: [LoginUseCase, UserRepository, Database, RegisterUseCase],
})
export class AuthModule {}
