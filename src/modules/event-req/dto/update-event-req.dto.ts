import { PartialType } from '@nestjs/mapped-types';
import { CreateEventReqDto } from './create-event-req.dto';

export class UpdateEventReqDto extends PartialType(CreateEventReqDto) {
  id: number;
}
