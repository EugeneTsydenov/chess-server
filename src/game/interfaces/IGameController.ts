import { IFindGameInput } from '../models/IFindGameInput';
import { Response } from 'express';

export interface IGameController {
  getGame(): Promise<void>;
  findGame(body: IFindGameInput, res: Response): Promise<void>;
  cancelGameSearch(body: { userId: number }, res: Response): Promise<void>;
}
