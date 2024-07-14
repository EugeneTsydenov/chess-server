import { Controller, Get } from '@nestjs/common';
import { IGameController } from './interfaces/IGameController';
import { Chess } from 'chess.js';

@Controller('game')
export class GameController implements IGameController {
  @Get(':id')
  getGame(): any {
    const chess = new Chess();
    console.log(chess.board());
  }
}
