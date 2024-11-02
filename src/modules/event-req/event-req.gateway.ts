import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from "@nestjs/websockets";
import { EventReqService } from "./event-req.service";
import { Server, Socket } from "socket.io";
import { CreateEventReqDto } from "./dto/create-event-req.dto";
import { IApiEventReqResponse, IApiResponse } from "src/models/response";

@WebSocketGateway()
export class EventReqGateway {
  constructor(private readonly eventReqService: EventReqService) {}

  @WebSocketServer() server: Server;
  @SubscribeMessage("EVENT_REQ")
  async reqEvent(
    @MessageBody() params: CreateEventReqDto,
    @ConnectedSocket() client: Socket
  ) {
    let response: IApiResponse = {
      success: false,
    };

    try {
      const data = await this.eventReqService.reqEvent(params);
      response.success = true;
      (response as IApiEventReqResponse).data = [data];
      this.server.to(`USER_${data.event.userId}`).emit("NEW_EVENT_REQ");
    } catch (error) {
      response.message = error;
      return response;
    }
  }

  @SubscribeMessage("EVENT_RES")
  async resEvent(
    @MessageBody() params: CreateEventReqDto,
    @ConnectedSocket() client: Socket
  ) {
    let response: IApiResponse = {
      success: false,
    };

    try {
      const data = await this.eventReqService.resEvent(params);
      response.success = true;
      (response as IApiEventReqResponse).data = [data];
      this.server.to(`USER_${data.userId}`).emit("NEW_EVENT_RES");
      return response;
    } catch (error) {
      response.message = error;
      return response;
    }
  }
}
