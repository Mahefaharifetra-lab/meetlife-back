import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { IApiResponse } from "./models/response";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): IApiResponse {
    return this.appService.getHello();
  }
}
