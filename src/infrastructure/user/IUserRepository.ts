export interface IUserRepository {
  getUser(): any;
  deleteUser(): any;
  updateUser(): any;
  saveUser(): Promise<any>;
}
