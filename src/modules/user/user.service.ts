import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";

@Injectable()
export class UserService {
  async editProfil(params: CreateUserDto): Promise<CreateUserDto> {
    try {
      await UserEntity.update(
        { ...params, updatedAt: Date.now() / 1000 },
        { where: [{ id: params.id }] }
      );
      return await UserEntity.findByPk(params.id);
    } catch (error) {
      throw error as string;
    }
  }
}
