export class CreateChatDto {
  id?: number;
  sender: number;
  target: number;
  message: string;
}
