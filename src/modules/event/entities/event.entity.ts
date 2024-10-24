import { Optional } from "sequelize";
import {
  Table,
  Model,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { CreateEventDto } from "src/modules/event/dto/create-event.dto";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";
import { UserEntity } from "src/modules/user/entities/user.entity";

interface IEventCreation extends Optional<CreateEventDto, "id"> {}

@Table({ createdAt: false, updatedAt: false, tableName: "Events" })
export class EventEntity
  extends Model<CreateEventDto, IEventCreation>
  implements CreateEventDto
{
  @PrimaryKey
  @AutoIncrement
  @Column
  override id!: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  cover: string;

  @Column(DataType.BIGINT)
  date: number;

  @Column(DataType.BIGINT)
  startTime: number;

  @Column(DataType.BIGINT)
  endTime: number;

  @Column
  city: string;

  @Column
  address: string;

  @Column
  minAge: number;

  @Column
  maxAge: number;

  @Column
  isPaid: boolean;

  @Column(DataType.BIGINT)
  price: number;

  @Column
  category: string;

  @ForeignKey(() => UserEntity)
  userId: number;

  @BelongsTo(() => UserEntity)
  user?: CreateUserDto;

  @Column(DataType.BIGINT)
  createdAt!: number;

  @Column(DataType.BIGINT)
  updatedAt!: number;
}
