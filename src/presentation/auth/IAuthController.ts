import { Observable } from 'rxjs';

export interface IAuthController {
  register(userData: any): any;
  login(userData: any): any;
  refresh(userData: any): any;
  logout(userData: any): any;
}
