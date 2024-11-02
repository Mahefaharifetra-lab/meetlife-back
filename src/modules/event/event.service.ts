import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { EventEntity } from "./entities/event.entity";
import { UserEntity } from "../user/entities/user.entity";
import { EventReqEntity } from "../event-req/entities/event-req.entity";

@Injectable()
export class EventService {
  async createEvent(params: CreateEventDto): Promise<CreateEventDto> {
    try {
      const temp: CreateEventDto = {
        name: params.name,
        description: params.description,
        cover: "",
        date: new Date(params.date).getTime() / 1000,
        startTime: params.startTime,
        endTime: params.endTime,
        city: params.city,
        address: params.address,
        minAge: params.minAge,
        maxAge: params.maxAge,
        isPaid: false,
        price: 0,
        category: params.category,
        userId: params.userId,
        createdAt: Date.now() / 1000,
        updatedAt: Date.now() / 1000,
      };

      return await EventEntity.create(temp);
    } catch (error) {
      throw error;
    }
  }
  async getAllEvents(): Promise<CreateEventDto[]> {
    try {
      return await EventEntity.findAll({ include: [UserEntity] });
    } catch (error) {
      throw error;
    }
  }

  async getAllUserEvents(userId: number): Promise<CreateEventDto[]> {
    try {
      return await EventEntity.findAll({
        where: [{ userId: userId }],
        include: [EventReqEntity],
      });
    } catch (error) {
      throw error;
    }
  }
}
