import { UseCase } from '@common/types';
import { NotifyUsersUseCaseInputDto } from '@src/game/dto/notify-users-use-case-input.dto';
import { NotifyUsersUseCaseOutputDto } from '@src/game/dto/notify-users-use-case-output.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { IRoom } from '@src/game/models/IRoom';

@Injectable()
export class NotifyUsersUseCase
  implements UseCase<NotifyUsersUseCaseInputDto, NotifyUsersUseCaseOutputDto>
{
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async execute(
    input: NotifyUsersUseCaseInputDto,
  ): Promise<NotifyUsersUseCaseOutputDto> {
    const room = await this.cacheManager.get<Omit<IRoom, 'roomId'>>(
      input.roomId,
    );

    return new NotifyUsersUseCaseOutputDto({
      socketId1: room.player1.socketId,
      socketId2: room.player2.socketId,
    });
  }
}
