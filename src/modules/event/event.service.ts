import { Injectable } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { EventEntity } from "./entities/event.entity";
import { UserEntity } from "../user/entities/user.entity";
import { EventReqEntity } from "../event-req/entities/event-req.entity";
import { API_ERROR } from "src/enums/error.enum";
import { uploadBase64File } from "src/services/uploadimg.service";

@Injectable()
export class EventService {
  async createEvent(params: CreateEventDto): Promise<CreateEventDto> {
    try {
      if (!params.cover || !/^data:([A-Za-z-+/]+);base64,/.test(params.cover))
        throw API_ERROR.WRONG_BASE64;

      const logDir = `event/${params.userId}`;
      const photoPath = await uploadBase64File({
        dir: logDir,
        base64: params.cover,
      });

      const temp: CreateEventDto = {
        name: params.name,
        description: params.description,
        cover: photoPath,
        date: new Date(params.date).getTime() / 1000,
        startTime: new Date(params.startTime).getTime() / 1000,
        endTime: new Date(params.endTime).getTime() / 1000,
        city: params.city,
        address: params.address,
        minAge: params.minAge,
        maxAge: params.maxAge,
        isPaid: params.isPaid,
        price: params.price,
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
