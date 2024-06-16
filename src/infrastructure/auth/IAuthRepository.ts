import {
  ChangeTokenRepositoryInputDto,
  SaveTokenRepositoryDto,
} from '@application/auth';
import { AuthEntity } from '@domain/auth';

export interface IAuthRepository {
  save(input: SaveTokenRepositoryDto): Promise<AuthEntity>;
  getTokenByJti(jti: string): Promise<AuthEntity>;
  delete(): any;
  changeToken(input: ChangeTokenRepositoryInputDto): Promise<AuthEntity>;
}
