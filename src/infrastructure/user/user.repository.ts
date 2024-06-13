import { IUserRepository } from './IUserRepository';
import { Database } from '@frameworks/database';
import { Injectable } from '@nestjs/common';
import { from } from 'rxjs';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private db: Database) {}
  deleteUser(): any {}

  getUser(): any {}

  updateUser(): any {}

  saveUser() {
    try {
      return from(
        this.db.user.create({
          data: {
            username: 'username',
            avatar: 'avatar',
            losses: 55,
            email: 'email',
            wins: 55,
            rating: 1300,
            draws: 10,
            display_name: 'display_name',
            updated_at: new Date(),
            games: 120,
            password: 'password',
          },
        }),
      );
    } catch (e) {
      console.log(e);
    }
  }
}
