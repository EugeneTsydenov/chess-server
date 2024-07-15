import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from '@common/types';
import { CancelSearchUseCaseInputDto } from '@src/game/dto/cancel-search-use-case-input.dto';
import { IRoom } from '@src/game/models/IRoom';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CancelSearchUseCase
  implements UseCase<CancelSearchUseCaseInputDto, void>
{
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async execute(input: CancelSearchUseCaseInputDto): Promise<void> {
    let queue = await this.cacheManager.get<IRoom[]>('queue');
    if (!queue) {
      return;
    }

    queue = queue.filter(
      (room) =>
        room.player1.id !== input.userId || room.player2?.id !== input.userId,
    );
    await this.cacheManager.set('queue', queue, 0);
  }
}
