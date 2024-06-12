import { IAuth } from './IAuth';

class AuthEntity implements IAuth {
  id: bigint;
  jti: string;
  user_id: bigint;
}
