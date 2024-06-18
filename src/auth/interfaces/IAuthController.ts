import { NextFunction, Response, Request } from 'express';
import { ILoginInput } from '../models/ILoginInput';
import { IRegisterInput } from '../models/IRegisterInput';

export interface IAuthController {
  register(
    body: IRegisterInput,
    res: Response,
    next: NextFunction,
  ): Promise<void>;
  login(body: ILoginInput, res: Response, next: NextFunction): Promise<void>;
  refresh(req: Request, res: Response, next: NextFunction): Promise<void>;
  logout(req: Request, res: Response, next: NextFunction): Promise<void>;
}
