import { CreateUserDto } from "src/modules/user/dto/create-user.dto";
import { IToken } from "./jwtPayload";
import { CreateEventDto } from "src/modules/event/dto/create-event.dto";
import { CreateEventReqDto } from "src/modules/event-req/dto/create-event-req.dto";

export interface IApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}
export interface IApiUserResponse extends IApiResponse {
  data: CreateUserDto[];
}
export interface IApiTokenResponse extends IApiResponse {
  data: IToken;
}

export interface IApiEventResponse extends IApiResponse {
  data: CreateEventDto[];
}
export interface IApiEventReqResponse extends IApiResponse {
  data: CreateEventReqDto[];
} 
