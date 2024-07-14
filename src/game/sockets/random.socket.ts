import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IFindGameInput } from '../models/IFindGameInput';
import { IRandomSocket } from '../interfaces/IRandomSocket';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { FindGameUseCase } from '@src/game/use-cases/find-game.use-case';
import { FindGameUseCaseInputDto } from '@src/game/dto/find-game-use-case-input.dto';

@WebSocketGateway({ cors: process.env.CLIENT_URL })
export class RandomSocket implements IRandomSocket {
  @WebSocketServer()
  socket: Server;

  constructor(private findGameUseCase: FindGameUseCase) {}

  @UseGuards(AuthGuard)
  @SubscribeMessage('find_game')
  async findGame(
    @MessageBody() body: IFindGameInput,
    @ConnectedSocket() client: any,
  ): Promise<void> {
    const returned = await this.findGameUseCase.execute(
      new FindGameUseCaseInputDto(body),
    );
    client.join(returned.roomId);
    if (returned.isFindGame) {
      this.socket.emit('game_found', { roomId: returned.roomId });
    }
  }

  @SubscribeMessage('give_up')
  giveUp(): any {
    return 'give_up';
  }

  @SubscribeMessage('move')
  move(): any {
    this.socket.emit('move', { message: 'move' });
  }

  @SubscribeMessage('offer_draw')
  offerDraw(): any {
    return 'offer_draw';
  }
}
