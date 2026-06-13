import { Test, TestingModule } from '@nestjs/testing';
import { PenjadwalanServiceController } from './penjadwalan-service.controller';
import { PenjadwalanServiceService } from './penjadwalan-service.service';

describe('PenjadwalanServiceController', () => {
  let penjadwalanServiceController: PenjadwalanServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PenjadwalanServiceController],
      providers: [PenjadwalanServiceService],
    }).compile();

    penjadwalanServiceController = app.get<PenjadwalanServiceController>(PenjadwalanServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(penjadwalanServiceController.getHello()).toBe('Hello World!');
    });
  });
});
