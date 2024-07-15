import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { IRandomSocket } from '../interfaces/IRandomSocket';
import { FindGameUseCase } from '@src/game/use-cases/find-game.use-case';
import { NotifyUsersUseCase } from '@src/game/use-cases/notify-users.use-case';
import * as process from 'node:process';

@WebSocketGateway({ cors: process.env.CLIENT_URL })
export class RandomSocket implements IRandomSocket {
  @WebSocketServer()
  socket: Server;

  constructor(
    private findGameUseCase: FindGameUseCase,
    private notifyUsersUseCase: NotifyUsersUseCase,
  ) {}

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

  @SubscribeMessage('cancel_search')
  cancelGameSearch(
    @MessageBody() body: { userId: number },
    @ConnectedSocket() client: any,
  ): void {}

  @SubscribeMessage('notify_users')
  async notifyUsers(
    @MessageBody() body: { roomId: string },
    @ConnectedSocket() client: any,
  ): Promise<void> {
    const sockets = await this.notifyUsersUseCase.execute(body);
    console.log(sockets);
    this.socket.to(sockets.socketId1).emit('notify', { roomId: body.roomId });
    this.socket.to(sockets.socketId2).emit('notify', { roomId: body.roomId });
  }

  @SubscribeMessage('join_room')
  joinRoom(
    @MessageBody() body: { roomId: string },
    @ConnectedSocket() client: any,
  ): void {
    console.log('join_room');
    client.join(body.roomId);
    this.socket.emit('start_game', { roomId: body.roomId });
  }
}
