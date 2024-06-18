import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUseCase } from './use-cases/login.use-case';
import { RegisterUseCase } from './use-cases/register.use-case';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { Database } from '@frameworks/database';
import { AuthRepository } from './auth.repository';
import { RefreshUseCase } from './use-cases/refresh.use-case';
import { UserRepository } from '@src/user';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { LogoutUseCase } from '@auth/use-cases/logout.use-case';

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
    AuthMiddleware,
    LogoutUseCase,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes('auth/logout');
  }
}
