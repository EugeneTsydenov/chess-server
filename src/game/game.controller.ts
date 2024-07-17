import { Body, Controller, Next, Param, Post, Res } from '@nestjs/common';
import { IGameController } from './interfaces/IGameController';
import { IFindGameInput } from './models/IFindGameInput';
import { FindGameUseCase } from '@src/game/use-cases/find-game.use-case';
import { FindGameUseCaseInputDto } from '@src/game/dto/find-game-use-case-input.dto';
import { NextFunction, Response } from 'express';
import { CancelSearchUseCase } from '@src/game/use-cases/cancel-search.use-case';
import { CancelSearchUseCaseInputDto } from '@src/game/dto/cancel-search-use-case-input.dto';
import { IGetGameInput } from '@src/game/models/IGetGameInput';
import { GetGameUseCase } from '@src/game/use-cases/get-game.use-case';

@Controller('game')
export class GameController implements IGameController {
  constructor(
    private findGameUseCase: FindGameUseCase,
    private cancelSearchUseCase: CancelSearchUseCase,
    private getGameUseCase: GetGameUseCase,
  ) {}

  @Post('find')
  async findGame(
    @Body() body: IFindGameInput,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const result = await this.findGameUseCase.execute(
        new FindGameUseCaseInputDto(body),
      );
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json({ message: 'Something went wrong!' });
    }
  }

  @Post('cancel')
  async cancelGameSearch(
    @Body() body: { userId: number },
    @Res() res: Response,
  ): Promise<void> {
    await this.cancelSearchUseCase.execute(
      new CancelSearchUseCaseInputDto(body),
    );
    res.status(200).json();
  }

  @Post(':roomId')
  async getGame(
    @Body() body: IGetGameInput,
    @Param('roomId') roomId: string,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): Promise<void> {
    try {
      console.log(roomId, 'get');
      const result = await this.getGameUseCase.execute({
        roomId,
        userId: body.userId,
        socketId: body.socketId,
      });
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}
