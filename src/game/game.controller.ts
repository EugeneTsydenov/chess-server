import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { IGameController } from './interfaces/IGameController';
import { IFindGameInput } from './models/IFindGameInput';
import { FindGameUseCase } from '@src/game/use-cases/find-game.use-case';
import { FindGameUseCaseInputDto } from '@src/game/dto/find-game-use-case-input.dto';
import { Response } from 'express';
import { CancelSearchUseCase } from '@src/game/use-cases/cancel-search.use-case';
import { CancelSearchUseCaseInputDto } from '@src/game/dto/cancel-search-use-case-input.dto';

@Controller('game')
export class GameController implements IGameController {
  constructor(
    private findGameUseCase: FindGameUseCase,
    private cancelSearchUseCase: CancelSearchUseCase,
  ) {}

  @Get(':id')
  getGame(): any {}

  @Post('find')
  async findGame(
    @Body() body: IFindGameInput,
    @Res() res: Response,
  ): Promise<void> {
    try {
      console.log(body);
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
    console.log(body);
    await this.cancelSearchUseCase.execute(
      new CancelSearchUseCaseInputDto(body),
    );
    res.status(200).json();
  }
}
