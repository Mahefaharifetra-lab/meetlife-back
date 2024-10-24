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
import { CreateChatDto } from "src/modules/chat/dto/create-chat.dto";
interface IChatCreation extends Optional<CreateChatDto, "id"> {}

@Table({ createdAt: false, updatedAt: false, tableName: "Chats" })
export class ChatEntity
  extends Model<CreateChatDto, IChatCreation>
  implements CreateChatDto
{
  @PrimaryKey
  @AutoIncrement
  @Column
  override id!: number;

  @Column
  sender: number;

  @Column
  target: number;

  @Column
  message: string;
}
