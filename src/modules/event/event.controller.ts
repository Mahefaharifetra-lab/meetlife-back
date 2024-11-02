import { Controller, Get, Param } from "@nestjs/common";
import { EventService } from "./event.service";
import { IApiEventResponse, IApiResponse } from "src/models/response";

@Controller("event")
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get()
  async getAllEvent() {
    let response: IApiResponse = {
      success: false,
    };
    try {
      const data = await this.eventService.getAllEvents();
      response.success = true;
      (response as IApiEventResponse).data = [...data];
    } catch (error) {
      response.message = error;
    }
    return response;
  }

  @Get(":id")
  async getAllUserEvent(@Param("id") id: number) {
    let response: IApiResponse = {
      success: false,
    };

    try {
      const data = await this.eventService.getAllUserEvents(id);
      response.success = true;
      (response as IApiEventResponse).data = [...data];
    } catch (error) {
      console.log(error);
      response.message = error;
    }
    return response;
  }
}
