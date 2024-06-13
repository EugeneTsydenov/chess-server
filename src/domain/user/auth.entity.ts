import { IAuth } from './IAuth';

export class AuthEntity implements IAuth {
  id: number;
  jti: string;
  userId: number;
}
