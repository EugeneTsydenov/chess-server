import { NextFunction, Response, Request } from 'express';
import { ILoginInput, IRegisterInput } from '@application/auth';

export interface IAuthController {
  register(
    body: IRegisterInput,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  login(body: ILoginInput, res: Response, next: NextFunction): Promise<void>;
  refresh(req: Request, res: Response, next: NextFunction): Promise<void>;
  logout(userData: any): Promise<void>;
}
