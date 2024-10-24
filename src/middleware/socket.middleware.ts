import { Socket } from "socket.io";
import { API_AUTH_ERROR, API_SEARCH_ERROR } from "src/enums/error.enum";
import { IJwtPayload } from "src/models/jwtPayload";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "src/modules/user/auth/auth.service";
export const socketMiddleware = async (
  socket: Socket
): Promise<CreateUserDto> => {
  const jwtService = new JwtService();
  const authService = new AuthService(jwtService);
  const token = socket.handshake.auth.token;
  try {
    if (!token) throw API_AUTH_ERROR.TOKEN_NOT_PROVIDED;
    const payload: IJwtPayload = await jwtService.verifyAsync(token, {
      secret: "MEETLIFE",
    });

    const user = authService.authenticate(payload);
    return user;
  } catch (error) {
    throw error as string;
  }
};
