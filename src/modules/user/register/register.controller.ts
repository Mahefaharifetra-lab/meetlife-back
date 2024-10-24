import { Body, Controller, Patch, Post, Put } from "@nestjs/common";
import { UpdateUserDto } from "../dto/update-user.dto";
import { RegisterService } from "./register.service";
import { IApiResponse, IApiUserResponse } from "src/models/response";

@Controller("register")
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  async registeUser(@Body() params: UpdateUserDto) {
    let response: IApiResponse = {
      success: false,
    };
    try {
      const user = await this.registerService.registeUser(params);
      response.success = true;
      (response as IApiUserResponse).data = [user];
    } catch (error) {
      response.message = error;
    }
    return response;
  }

  @Put()
  async editVerificationCode(@Body() params: UpdateUserDto) {
    let response: IApiResponse = {
      success: false,
    };
    try {
      const user = await this.registerService.editverificationCode(params.id);
      response.success = true;
      (response as IApiUserResponse).data = [user];
    } catch (error) {
      response.message = error;
    }
    return response;
  }

  @Patch()
  async verifyAccount(@Body() params: UpdateUserDto) {
    let response: IApiResponse = {
      success: false,
    };
    try {
      const user = await this.registerService.verifyAccount(params);
      response.success = true;
      (response as IApiUserResponse).data = [user];
    } catch (error) {
      response.message = error;
    }
    return response;
  }
}
