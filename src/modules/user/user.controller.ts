import { Controller, Body, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { IApiResponse, IApiUserResponse } from "src/models/response";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  async editProfil(@Body() params: CreateUserDto) {
    let response: IApiResponse = {
      success: false,
    };
    try {
      const data = await this.userService.editProfil(params);
      response.success = true;
      (response as IApiUserResponse).data = [data];
    } catch (error) {
      response.message = error;
    }
    return response;
  }
}
