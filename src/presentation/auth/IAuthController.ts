import { Observable } from 'rxjs';

export interface IAuthController {
  register(userData: any): Observable<any>;
  login(userData: any): Observable<any>;
  refresh(userData: any): Observable<any>;
  logout(userData: any): Observable<any>;
}
