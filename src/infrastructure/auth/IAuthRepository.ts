import { SaveTokenRepositoryDto } from '@application/auth';
import { AuthEntity } from '@domain/auth';

export interface IAuthRepository {
  save(input: SaveTokenRepositoryDto): Promise<AuthEntity>;
  get(): any;
  delete(): any;
}
