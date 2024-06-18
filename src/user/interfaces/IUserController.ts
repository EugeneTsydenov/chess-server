import { NextFunction, Response } from 'express';

export interface IUserController {
  getMe(
    body: { userId: number },
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  getUser(): any;
  updateMe(): any;
  deleteMe(): any;
}
