import { Test, TestingModule } from '@nestjs/testing';
import { EventReqService } from './event-req.service';

describe('EventReqService', () => {
  let service: EventReqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventReqService],
    }).compile();

    service = module.get<EventReqService>(EventReqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
