import { Injectable } from "@nestjs/common";
import {
  CreateEventReqDto,
  EVENT_REQ_STATES,
} from "./dto/create-event-req.dto";
import { EventReqEntity } from "./entities/event-req.entity";
import { where } from "sequelize";

@Injectable()
export class EventReqService {
  async reqEvent(params: CreateEventReqDto): Promise<CreateEventReqDto> {
    try {
      const temp: CreateEventReqDto = {
        state: EVENT_REQ_STATES.PENDING,
        userId: params.userId,
        eventId: params.eventId,
        createdAt: Date.now() / 1000,
        updatedAt: Date.now() / 1000,
      };
      return await EventReqEntity.create(temp);
    } catch (error) {
      throw error;
    }
  }

  async resEvent(params: CreateEventReqDto): Promise<CreateEventReqDto> {
    try {
      const req = await EventReqEntity.findByPk(params.id);
      await EventReqEntity.update(
        { state: params.state },
        { where: [{ id: req.id }] }
      );

      return await EventReqEntity.findByPk(req.id);
    } catch (error) {
      throw error;
    }
  }
}
