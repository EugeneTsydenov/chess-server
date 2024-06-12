import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameSocket } from '@presentation/game/game.socket';

@Module({
  controllers: [GameController],
  providers: [GameSocket],
})
export class GameModule {}
