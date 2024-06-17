import { SaveTokenRepositoryDto } from '../dto/saveTokenRepository.dto';
import { AuthEntity } from '../entities/auth.entity';
import { ChangeTokenRepositoryInputDto } from '../dto/changeTokenRepositoryInput.dto';

export interface IAuthRepository {
  save(input: SaveTokenRepositoryDto): Promise<AuthEntity>;
  getTokenByJti(jti: string): Promise<AuthEntity>;
  delete(): any;
  changeToken(input: ChangeTokenRepositoryInputDto): Promise<AuthEntity>;
}
