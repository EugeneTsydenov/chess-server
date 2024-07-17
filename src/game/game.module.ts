import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GameController } from './game.controller';
import { RandomSocket } from './sockets/random.socket';
import { TokenService } from '../auth/services/token.service';
import { AuthMiddleware } from '@src/auth';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@src/user';
import { Database } from '@frameworks/database';
import { AuthRepository } from '@auth/auth.repository';
import { FindGameUseCase } from '@src/game/use-cases/find-game.use-case';
import { CacheModule } from '@nestjs/cache-manager';
import { NotifyUsersUseCase } from '@src/game/use-cases/notify-users.use-case';
import { CancelSearchUseCase } from '@src/game/use-cases/cancel-search.use-case';
import { GetGameUseCase } from '@src/game/use-cases/get-game.use-case';

@Module({
  controllers: [GameController],
  providers: [
    RandomSocket,
    TokenService,
    JwtService,
    UserRepository,
    Database,
    AuthRepository,
    FindGameUseCase,
    NotifyUsersUseCase,
    CancelSearchUseCase,
    GetGameUseCase,
  ],
  imports: [CacheModule.register()],
})
export class GameModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('game/find', 'game/cancel', 'game/:roomId');
  }
}
