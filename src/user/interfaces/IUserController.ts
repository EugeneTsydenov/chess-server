import { NextFunction, Response } from 'express';

export interface IUserController {
  getMe(
    body: { userId: number },
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  getUserById(id: number, res: Response, next: NextFunction): Promise<void>;
  updateMe(): any;
  deleteMe(): any;
}
