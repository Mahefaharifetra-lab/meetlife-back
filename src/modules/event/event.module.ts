import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventGateway } from './event.gateway';
import { EventController } from './event.controller';

@Module({
  providers: [EventGateway, EventService],
  controllers: [EventController],
})
export class EventModule {}
