import { Test, TestingModule } from '@nestjs/testing';
import { PayrollServiceController } from './payroll-service.controller';
import { PayrollServiceService } from './payroll-service.service';

describe('PayrollServiceController', () => {
  let payrollServiceController: PayrollServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PayrollServiceController],
      providers: [PayrollServiceService],
    }).compile();

    payrollServiceController = app.get<PayrollServiceController>(PayrollServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(payrollServiceController.getHello()).toBe('Hello World!');
    });
  });
});
