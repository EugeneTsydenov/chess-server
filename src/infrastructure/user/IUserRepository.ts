import { Observable } from 'rxjs';

export interface IUserRepository {
  getUser(): any;
  deleteUser(): any;
  updateUser(): any;
  saveUser(): Observable<any>;
}
