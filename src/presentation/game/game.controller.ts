import { Controller, Get } from '@nestjs/common';
import { IGameController } from './IGameController';

@Controller('game')
export class GameController implements IGameController {
  @Get(':id')
  getGame(): any {
    return 'get game';
  }
}
