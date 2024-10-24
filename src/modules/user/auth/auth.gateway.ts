import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { AuthService } from './auth.service';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { IApiResponse, IApiUserResponse } from 'src/models/response';
import { socketMiddleware } from 'src/middleware/socket.middleware';
@WebSocketGateway({ cors: { origin: '*' } })
export class AuthGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(AuthGateway.name);
  constructor(private readonly authService: AuthService) {}

  afterInit(server: any) {
    this.logger.log(`${AuthGateway.name} Initialized 🚀`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const response: IApiResponse = {
      success: false,
    };

    try {
      const user = await socketMiddleware(client);
      const canal = `USER_${user.id}`;
      client.join(canal);
      this.logger.log(`${user.pseudo} connected`);
      response.success = true;
      (response as IApiUserResponse).data = [user];
      this.server.to(canal).emit('CONNECTED', response);
    } catch (error) {
      this.logger.error(`${client.id} can't be connected`);
    }
  }

}
