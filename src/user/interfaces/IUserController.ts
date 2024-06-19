import { NextFunction, Response } from 'express';
import { IUpdatedMeBody } from '../models/IUpdatedMeBody';

export interface IUserController {
  getMe(
    body: { userId: number },
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  getUserById(id: number, res: Response, next: NextFunction): Promise<void>;
  updateMe(
    body: IUpdatedMeBody,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  deleteMe(): any;
}
