import { Database } from '@frameworks/database';
import { IAuthRepository } from './IAuthRepository';

export class AuthRepository implements IAuthRepository {
  constructor(private db: Database) {}

  delete(): any {}

  get(): any {}

  save(): any {}
}
