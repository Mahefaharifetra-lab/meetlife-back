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
import { CreateEventReqDto } from "../dto/create-event-req.dto";
import { UserEntity } from "src/modules/user/entities/user.entity";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";
import { CreateEventDto } from "src/modules/event/dto/create-event.dto";
import { EventEntity } from "src/modules/event/entities/event.entity";

interface IEventReqCreation extends Optional<CreateEventReqDto, "id"> {}

@Table({ createdAt: false, updatedAt: false, tableName: "EventReqs" })
export class EventReqEntity
  extends Model<CreateEventReqDto, IEventReqCreation>
  implements CreateEventReqDto
{
  @PrimaryKey
  @AutoIncrement
  @Column
  override id!: number;

  @Column
  state: string;

  @ForeignKey(() => EventEntity)
  eventId: number;

  @BelongsTo(() => EventEntity)
  event?: CreateEventDto;

  @ForeignKey(() => UserEntity)
  userId: number;

  @BelongsTo(() => UserEntity)
  user?: CreateUserDto;

  @Column(DataType.BIGINT)
  createdAt!: number;

  @Column(DataType.BIGINT)
  updatedAt!: number;
}
