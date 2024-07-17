import { UseCase } from '@common/types';
import { GetGameUseCaseInputDto } from '@src/game/dto/get-game-use-case-input.dto';
import { GetGameUseCaseOutputDto } from '@src/game/dto/get-game-use-case-output.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { IRoom } from '@src/game/models/IRoom';

@Injectable()
export class GetGameUseCase
  implements UseCase<GetGameUseCaseInputDto, GetGameUseCaseOutputDto>
{
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async execute(
    input: GetGameUseCaseInputDto,
  ): Promise<GetGameUseCaseOutputDto> {
    const room = await this.cacheManager.get<IRoom>(input.roomId);
    if (!room) {
      throw new NotFoundException({ message: 'Game is not defined!' });
    }

    const game = room.game;
    const turn = game.turn() === 'w' ? 'white' : 'black';

    if (room.player1.id === input.userId || room.player2.id === input.userId) {
      if (room.player1.id === input.userId) {
        room.player1.socketId = input.socketId;
        await this.cacheManager.set(input.roomId, room, 0);
        return new GetGameUseCaseOutputDto({
          side: room.player1.side,
          game: {
            fen: game.fen(),
            turn,
            moves: game.history(),
            isGameOver: game.isGameOver(),
            winner: null,
            loser: null,
            cause: null,
          },
          player1: { id: room.player1.id, side: room.player1.side },
          player2: { id: room.player2.id, side: room.player2.side },
          enemy: room.player2.id,
          role: 'player',
        });
      }

      if (room.player2.id === input.userId) {
        room.player2.socketId = input.socketId;
        await this.cacheManager.set(input.roomId, room, 0);
        return new GetGameUseCaseOutputDto({
          side: room.player2.side,
          game: {
            fen: game.fen(),
            turn,
            moves: game.history(),
            isGameOver: game.isGameOver(),
            winner: null,
            loser: null,
            cause: null,
          },
          player1: { id: room.player1.id, side: room.player1.side },
          player2: { id: room.player2.id, side: room.player2.side },
          enemy: room.player1.id,
          role: 'player',
        });
      }
    } else {
      room.watchers = room.watchers + 1;
      await this.cacheManager.set(input.roomId, room, 0);
      return new GetGameUseCaseOutputDto({
        side: 'white',
        game: {
          fen: game.fen(),
          turn,
          moves: game.history(),
          isGameOver: game.isGameOver(),
          winner: null,
          loser: null,
          cause: null,
        },
        player1: { id: room.player1.id, side: room.player1.side },
        player2: { id: room.player2.id, side: room.player2.side },
        enemy: null,
        role: 'watcher',
      });
    }
  }
}
