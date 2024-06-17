import { IGameRepository } from './interfaces/IGameRepositry';
import { Database } from '@frameworks/database';

export class GameRepository implements IGameRepository {
  constructor(private db: Database) {}

  getAllGames(): any {}

  getGame(): any {}

  saveGame(): any {}
}
