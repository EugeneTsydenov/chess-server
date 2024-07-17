import { UseCase } from '@common/types';
import { FindGameUseCaseInputDto } from '../dto/find-game-use-case-input.dto';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { v4 as uuidv4 } from 'uuid';
import { IRoom } from '../models/IRoom';
import { FindGameUseCaseOutputDto } from '@src/game/dto/find-game-use-case-output.dto';
import { Chess } from 'chess.js';

@Injectable()
export class FindGameUseCase
  implements
    UseCase<FindGameUseCaseInputDto, FindGameUseCaseOutputDto>,
    OnModuleInit
{
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async onModuleInit(): Promise<void> {
    const queue = await this.cacheManager.get<IRoom[]>('queue');
    if (!queue) {
      await this.cacheManager.set('queue', [], 0);
    }
  }

  async execute(
    input: FindGameUseCaseInputDto,
  ): Promise<FindGameUseCaseOutputDto> {
    let queue = await this.cacheManager.get<IRoom[]>('queue');
    console.log(queue, 'queue');
    if (!queue) {
      queue = [];
    }
    for (const room of queue) {
      if (
        room.isRating !== input.gameSettings.isRating ||
        room.timeMode !== input.gameSettings.timeTitle ||
        room.player1.id === input.userId
      ) {
        continue;
      }

      const randomValue = Math.random();

      await this.cacheManager.set(
        room.roomId,
        {
          roomId: room.roomId,
          game: new Chess(),
          player1: {
            id: room.player1.id,
            side: randomValue < 0.5 ? 'black' : 'white',
            socketId: room.player1.socketId,
          },
          player2: {
            id: input.userId,
            side: randomValue >= 0.5 ? 'black' : 'white',
            socketId: input.socketId,
          },
          isRating: room.isRating,
          timeMode: room.timeMode,
          isStartGame: true,
          watchers: 0,
        },
        0,
      );

      queue = queue.filter((r) => r.roomId !== room.roomId);
      await this.cacheManager.set('queue', queue, 0);
      return new FindGameUseCaseOutputDto({
        roomId: room.roomId,
        isFindGame: true,
      });
    }

    const roomId = uuidv4();
    queue.push({
      roomId,
      game: null,
      player1: { id: input.userId, side: null, socketId: input.socketId },
      player2: null,
      isRating: input.gameSettings.isRating,
      timeMode: input.gameSettings.timeTitle,
      isStartGame: false,
      watchers: 0,
    });

    await this.cacheManager.set('queue', queue, 0);
    return new FindGameUseCaseOutputDto({ roomId: roomId, isFindGame: false });
  }
}
