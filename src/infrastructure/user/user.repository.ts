import { IUserRepository } from './IUserRepository';
import { Database } from '@frameworks/database';
import { Injectable } from '@nestjs/common';
import { catchError, EMPTY, from, map, Observable } from 'rxjs';
import * as console from 'node:console';
import { IUserFromDb, UserEntity } from '@domain/user';
import { SaveUserRepositoryDto } from '@application/user';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private db: Database) {}
  deleteUser(): any {}

  updateUser(): any {}

  saveUser(userData: SaveUserRepositoryDto) {
    const res = this.db.user.create({
      data: {
        ...userData,
        updated_at: new Date(),
      },
    });
    return from(res).pipe(
      map((userFromDb) => {
        console.log(userFromDb);
        return new UserEntity(userFromDb);
      }),
      catchError((err) => {
        console.log(err);
        return EMPTY;
      }),
    );
  }

  getUserById(id: number): any {}

  getUserByUsername(username: string): Observable<UserEntity> {
    const res = this.db.user.findFirst({
      where: {
        username: username,
      },
    });
    return from(res).pipe(
      map((userFromDb: IUserFromDb | null) => {
        if (!userFromDb) {
          return null;
        }
        return new UserEntity(userFromDb);
      }),
    );
  }
}
