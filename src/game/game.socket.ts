import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as process from 'node:process';
import { Server } from 'socket.io';
import { IGameSocket } from './interfaces/IGameSocket';

@WebSocketGateway({ cors: process.env.CLIENT_URL })
export class GameSocket implements IGameSocket {
  @WebSocketServer()
  socket: Server;

  @SubscribeMessage('find_game')
  findGame(): any {
    return 'find_game';
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
