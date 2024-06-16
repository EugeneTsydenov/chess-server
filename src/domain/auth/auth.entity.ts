import { IAuth } from './IAuth';
import { ITokenFromDb } from '@domain/auth/model/ITokenFromDb';

export class AuthEntity implements IAuth {
  id: number;
  jti: string;
  userId: number;

  constructor(input: ITokenFromDb) {
    this.id = input.id;
    this.jti = input.jti;
    this.userId = input.user_id;
  }
}
