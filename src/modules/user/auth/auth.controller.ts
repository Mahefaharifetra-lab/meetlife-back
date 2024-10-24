import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { IApiResponse, IApiTokenResponse } from 'src/models/response';
import { IToken } from 'src/models/jwtPayload';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signIn(@Body() data: CreateUserDto) {
    let response: IApiResponse = {
      success: false,
    };

    try {
      const token: IToken = await this.authService.signIn(data);
      response.success = true;
      (response as IApiTokenResponse).data = token;
    } catch (error) {
      response.message = error;
    }
    return response;
  }
}
