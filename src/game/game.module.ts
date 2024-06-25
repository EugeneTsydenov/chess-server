import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameSocket } from './game.socket';

@Module({
  controllers: [GameController],
  providers: [GameSocket],
})
export class GameModule {}
