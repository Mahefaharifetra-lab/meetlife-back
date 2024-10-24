import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { EventService } from "./event.service";
import { Server, Socket } from "socket.io";
import { CreateEventDto } from "./dto/create-event.dto";
import { IApiEventResponse, IApiResponse } from "src/models/response";

@WebSocketGateway()
export class EventGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly eventService: EventService) {}

  @SubscribeMessage("CREATE_EVENT")
  async create(
    @MessageBody() params: CreateEventDto,
    @ConnectedSocket() client: Socket
  ) {
    let response: IApiResponse = {
      success: false,
    };

    try {
      const data = await this.eventService.createEvent(params);
      response.success = true;
      (response as IApiEventResponse).data = [data];
      this.server.emit("NEW_EVENT", response);
    } catch (error) {
      response.message = error;
    }
    return response;
  }
}
