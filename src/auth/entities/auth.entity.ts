import { IAuth } from '../models/IAuth';
import { ITokenDb } from '../models/ITokenDb';

export class AuthEntity implements IAuth {
  id: number;
  jti: string;
  userId: number;

  constructor(input: ITokenDb) {
    this.id = input.id;
    this.jti = input.jti;
    this.userId = input.user_id;
  }
}
