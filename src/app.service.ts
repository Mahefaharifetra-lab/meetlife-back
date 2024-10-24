import { Injectable } from "@nestjs/common";
import { IApiResponse } from "./models/response";

@Injectable()
export class AppService {
  getHello(): IApiResponse {
    let response: IApiResponse = {
      success: true,
    };

    return response;
  }
}
