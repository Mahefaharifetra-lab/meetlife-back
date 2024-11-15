import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserEntity } from "./entities/user.entity";
import { API_ERROR } from "src/enums/error.enum";
import { uploadBase64File } from "src/services/uploadimg.service";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  async editProfil(params: CreateUserDto): Promise<CreateUserDto> {
    try {
      if (!params.avatar || !/^data:([A-Za-z-+/]+);base64,/.test(params.avatar))
        throw API_ERROR.WRONG_BASE64;

      const logDir = `avatar/${params.id}`;
      const photoPath = await uploadBase64File({
        dir: logDir,
        base64: params.avatar,
      });
      const birthdate = new Date(params.birthdate).getTime() / 1000;

      const temp: UpdateUserDto = {
        fullName: params.fullName,
        pseudo: params.pseudo,
        phone: params.phone,
        email: params.email,
        gender: params.gender,
        city: params.city,
        birthdate: birthdate,
        avatar: photoPath,
        personality: params.personality,
        about: params.about,
        motto: params.motto,
        typeAccount: params.typeAccount,
        updatedAt: Date.now() / 1000,
      };

      await UserEntity.update({ ...temp }, { where: [{ id: params.id }] });
      return await UserEntity.findByPk(params.id);
    } catch (error) {
      throw error as string;
    }
  }
}
