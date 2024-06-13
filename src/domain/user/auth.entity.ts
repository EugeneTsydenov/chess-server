import { IAuth } from './IAuth';

class AuthEntity implements IAuth {
  id: bigint;
  jti: string;
  userId: bigint;
}
