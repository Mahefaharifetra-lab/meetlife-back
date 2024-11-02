import { CreateEventDto } from "src/modules/event/dto/create-event.dto";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";

export class CreateEventReqDto {
  id?: number;
  state: string;

  userId: number;
  user?: CreateUserDto;

  eventId: number;
  event?: CreateEventDto;
  createdAt?: number;
  updatedAt?: number;
}

export enum EVENT_REQ_STATES {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
}
