import { SaveTokenRepositoryDto } from '../dto/saveTokenRepository.dto';
import { AuthEntity } from '../entities/auth.entity';
import { ChangeTokenRepositoryInputDto } from '../dto/changeTokenRepositoryInput.dto';
import { IInvalidToken } from '../models/IInvalidToken';

export interface IAuthRepository {
  save(input: SaveTokenRepositoryDto): Promise<AuthEntity>;
  getTokenByJti(jti: string): Promise<AuthEntity>;
  getTokenByUserId(userId: number): Promise<AuthEntity>;
  deleteByUserId(userId: number): Promise<any>;
  changeToken(input: ChangeTokenRepositoryInputDto): Promise<AuthEntity>;
  saveInvalidToken(jti: string): Promise<void>;
  getInvalidToken(jti: string): Promise<IInvalidToken>;
}
