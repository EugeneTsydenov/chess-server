import { IFindGameInput } from '../models/IFindGameInput';
import { NextFunction, Response } from 'express';
import { IGetGameInput } from '@src/game/models/IGetGameInput';

export interface IGameController {
  getGame(
    body: IGetGameInput,
    roomId: string,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  findGame(body: IFindGameInput, res: Response): Promise<void>;
  cancelGameSearch(body: { userId: number }, res: Response): Promise<void>;
}
