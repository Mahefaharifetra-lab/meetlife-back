import { Optional } from "sequelize";
import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  Unique,
  DefaultScope,
  Scopes,
  DataType,
  AllowNull,
  HasMany,
} from "sequelize-typescript";
import { CreateUserDto } from "../dto/create-user.dto";
import { CreateEventDto } from "src/modules/event/dto/create-event.dto";
import { EventEntity } from "src/modules/event/entities/event.entity";

interface IUserCreation extends Optional<CreateUserDto, "id"> {}

@DefaultScope(() => ({
  attributes: {
    exclude: ["password"],
  },
}))
@Scopes(() => ({
  login: {
    attributes: ["id", "email", "password"],
  },
}))
@Table({ createdAt: false, updatedAt: false, tableName: "Users" })
export class UserEntity
  extends Model<CreateUserDto, IUserCreation>
  implements CreateUserDto
{
  @PrimaryKey
  @AutoIncrement
  @Column
  override id!: number;

  @AllowNull
  @Column
  fullName: string;

  @Unique
  @Column
  email: string;

  @AllowNull
  @Unique
  @Column
  phone: string;

  @Column
  password!: string;

  @AllowNull
  @Column(DataType.TEXT)
  avatar: string;

  @AllowNull
  @Column
  city!: string;

  @Column
  pseudo: string;

  @AllowNull
  @Column
  gender: string;

  @Column
  verificationCode: string;

  @AllowNull
  @Column(DataType.BIGINT)
  birthdate: number;

  @AllowNull
  @Column
  voiceNote: string;

  @AllowNull
  @Column
  personality: string;

  @AllowNull
  @Column
  about: string;

  @AllowNull
  @Column
  motto: string;

  @AllowNull
  @Column
  typeAccount: string;

  @AllowNull
  @Column
  verified: boolean;

  @AllowNull
  @Column
  hobby: string;

  @HasMany(() => EventEntity)
  events?: CreateEventDto[];

  @Column(DataType.BIGINT)
  createdAt!: number;

  @Column(DataType.BIGINT)
  updatedAt!: number;
}
