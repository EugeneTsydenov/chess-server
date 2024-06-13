import { IAuth } from './IAuth';

export class AuthEntity implements IAuth {
  id: bigint;
  jti: string;
  userId: bigint;
}
