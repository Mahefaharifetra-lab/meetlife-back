import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "../dto/update-user.dto";
import { CreateUserDto, GENDER } from "../dto/create-user.dto";
import { genSaltSync, hashSync } from "bcrypt";
import { UserEntity } from "../entities/user.entity";
import { StringService } from "src/services/string.service";
import { API_REGISTER_ERROR, API_SEARCH_ERROR } from "src/enums/error.enum";
import { EmailApi } from "src/services/mail.service";
@Injectable()
export class RegisterService {
  private mailApi = new EmailApi();
  async registeUser(params: UpdateUserDto): Promise<CreateUserDto> {
    const salt = genSaltSync(10);
    const crytedPassword = hashSync(params.password, salt);
    const randCode = StringService.RandUpString();
    try {
      const temp: CreateUserDto = {
        fullName: params.fullName,
        email: params.email,
        password: crytedPassword,
        verificationCode: randCode,
        createdAt: Date.now() / 1000,
        updatedAt: Date.now() / 1000,
      };

      const result = await UserEntity.create(temp);
      this.mailApi.sendVerificationEmail(result);
      return result;
    } catch (e) {
      console.log(e);
      let tmpError: any = e;
      let error = API_REGISTER_ERROR.NULL;
      if (tmpError.errors?.length) {
        if (tmpError.errors[0].type === "unique violation") {
          switch (tmpError.errors[0].path) {
            case "email":
              error = API_REGISTER_ERROR.EMAIL_ALREADY_IN_USE;
              break;
            case "pseudo":
              error = API_REGISTER_ERROR.PSEUDO_ALREADY_IN_USE;
              break;
          }
        }
      }
      throw error;
    }
  }

  async editverificationCode(id: number): Promise<CreateUserDto> {
    try {
      const randCode = StringService.RandUpString();
      await UserEntity.update(
        { verificationCode: randCode },
        { where: [{ id: id }] }
      );
      const result = await UserEntity.findByPk(id);
      this.mailApi.sendVerificationEmail(result);
      return result;
    } catch (error) {
      throw error as string;
    }
  }

  async verifyAccount(params: UpdateUserDto): Promise<CreateUserDto> {
    try {
      const user = await UserEntity.findByPk(params.id);
      if (!user) API_SEARCH_ERROR.USER_NOT_FOUND;
      if (user.verificationCode != params.verificationCode.toUpperCase())
        throw API_REGISTER_ERROR.WRONG_VERIFICATION_CODE;
      await UserEntity.update({ verified: true }, { where: [{ id: user.id }] });
      return await UserEntity.findByPk(user.id);
    } catch (error) {
      throw error as string;
    }
  }
}
