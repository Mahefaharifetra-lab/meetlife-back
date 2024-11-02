import { CreateEventReqDto } from "src/modules/event-req/dto/create-event-req.dto";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";

export class CreateEventDto {
  id?: number;
  name: string;
  description: string;
  cover: string;
  date: number;
  startTime: number;
  endTime: number;
  city: string;
  address: string;
  minAge: number;
  maxAge: number;
  isPaid: boolean;
  price: number;
  category: string;

  userId: number;
  user?: CreateUserDto;
  req?: CreateEventReqDto[];
  createdAt?: number;
  updatedAt?: number;
}
