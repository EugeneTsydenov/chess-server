import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@common/types';
import { CancelGameSearchInputDto } from '@src/game/dto/cancel-game-search-input.dto';
import { IRoom } from '../models/IRoom';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CancelGameSearchUseCase
  implements UseCase<CancelGameSearchInputDto, any>
{
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async execute(input: CancelGameSearchInputDto): Promise<any> {
    let queue = await this.cacheManager.get<IRoom[]>('queue');
    if (!queue) {
      return;
    }

    queue = queue.filter((room) => room.player1.id !== input.userId);
    await this.cacheManager.set('queue', queue, 0);

    return {};
  }
}
