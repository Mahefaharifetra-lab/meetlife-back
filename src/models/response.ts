import { CreateUserDto } from "src/modules/user/dto/create-user.dto";
import { IToken } from "./jwtPayload";
import { CreateEventDto } from "src/modules/event/dto/create-event.dto";

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
