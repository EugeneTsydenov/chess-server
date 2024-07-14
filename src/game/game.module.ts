import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { RandomSocket } from './sockets/random.socket';
import { TokenService } from '../auth/services/token.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@src/user';
import { Database } from '@frameworks/database';
import { AuthRepository } from '@auth/auth.repository';
import { FindGameUseCase } from '@src/game/use-cases/find-game.use-case';
import { CacheModule } from '@nestjs/cache-manager';

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
  ],
  imports: [CacheModule.register()],
})
export class GameModule {}
