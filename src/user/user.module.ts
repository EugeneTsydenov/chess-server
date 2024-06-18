import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { GetMeUseCase } from './use-cases/get-me.use-case';
import { UserRepository } from './user.repository';
import { AuthMiddleware } from '@src/auth';

@Module({
  controllers: [UserController],
  providers: [GetMeUseCase],
})
export class UserModule {}
