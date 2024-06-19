import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { GetMeUseCase } from './use-cases/get-me.use-case';
import { UserRepository } from '@src/user/user.repository';
import { Database } from '@frameworks/database';
import { AuthMiddleware } from '@src/auth';
import { TokenService } from '@auth/services/token.service';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '@auth/auth.repository';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.use-case';
import { UpdateMeUseCase } from './use-cases/update-me.use-case';

@Module({
  controllers: [UserController],
  providers: [
    GetMeUseCase,
    UserRepository,
    Database,
    TokenService,
    JwtService,
    AuthRepository,
    GetUserByIdUseCase,
    UpdateMeUseCase,
  ],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes('users/me');
  }
}
