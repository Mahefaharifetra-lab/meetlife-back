import { Module } from '@nestjs/common';
import { EventReqService } from './event-req.service';
import { EventReqGateway } from './event-req.gateway';

@Module({
  providers: [EventReqGateway, EventReqService],
})
export class EventReqModule {}
