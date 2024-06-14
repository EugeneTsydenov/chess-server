import { NextFunction, Response } from 'express';

export interface IAuthController {
  register(userData: any, res: Response, next: NextFunction): void;
  login(userData: any): void;
  refresh(userData: any): void;
  logout(userData: any): void;
}
