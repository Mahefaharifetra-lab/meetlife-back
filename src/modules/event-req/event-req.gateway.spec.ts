import { Test, TestingModule } from '@nestjs/testing';
import { EventReqGateway } from './event-req.gateway';
import { EventReqService } from './event-req.service';

describe('EventReqGateway', () => {
  let gateway: EventReqGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventReqGateway, EventReqService],
    }).compile();

    gateway = module.get<EventReqGateway>(EventReqGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
