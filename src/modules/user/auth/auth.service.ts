import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserEntity } from "../entities/user.entity";
import { API_AUTH_ERROR, API_SEARCH_ERROR } from "src/enums/error.enum";
import { compareSync } from "bcrypt";
import { IJwtPayload, IToken } from "src/models/jwtPayload";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async signIn(params: CreateUserDto): Promise<IToken> {
    try {
      const user = await UserEntity.scope("login").findOne({
        where: { email: params.email },
      });
      if (!user) throw API_SEARCH_ERROR.USER_NOT_FOUND;
      if (!compareSync(params.password, user.password))
        throw API_AUTH_ERROR.WRONG_PASSWORD;

      const payload: IJwtPayload = {
        id: user.id,
        pseudo: user.pseudo,
      };

      return { token: await this.jwtService.signAsync(payload) } as IToken;
    } catch (error) {
      throw error;
    }
  }

  async authenticate(params: IJwtPayload): Promise<CreateUserDto> {
    try {
      const user = await UserEntity.findByPk(params.id);
      if (!user) throw API_SEARCH_ERROR.USER_NOT_FOUND;

      return user;
    } catch (error) {
      throw error as string;
    }
  }
}
