import { Test, TestingModule } from '@nestjs/testing';
import { KaryawanServiceController } from './karyawan-service.controller';
import { KaryawanServiceService } from './karyawan-service.service';

describe('KaryawanServiceController', () => {
  let karyawanServiceController: KaryawanServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [KaryawanServiceController],
      providers: [KaryawanServiceService],
    }).compile();

    karyawanServiceController = app.get<KaryawanServiceController>(KaryawanServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(karyawanServiceController.getHello()).toBe('Hello World!');
    });
  });
});
