import { Test, TestingModule } from '@nestjs/testing';
import { PayrollServiceController } from './payroll-service.controller';
import { PayrollServiceService } from './payroll-service.service';

describe('PayrollServiceController', () => {
  let controller: PayrollServiceController;
  let service: PayrollServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayrollServiceController],
      providers: [
        {
          provide: PayrollServiceService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([{ id: '1', user_id: 'emp-1' }]),
            findOne: jest.fn().mockResolvedValue({ id: '1', user_id: 'emp-1' }),
            create: jest.fn().mockImplementation((dto) => Promise.resolve({ id: '2', ...dto })),
            update: jest.fn().mockImplementation((id, dto) => Promise.resolve({ id, ...dto })),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<PayrollServiceController>(PayrollServiceController);
    service = module.get<PayrollServiceService>(PayrollServiceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return an array of payrolls', async () => {
    const result = await controller.getAllPayrolls();
    expect(result).toEqual([{ id: '1', user_id: 'emp-1' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('findOne should return a single payroll', async () => {
    const result = await controller.getPayrollById('1');
    expect(result).toEqual({ id: '1', user_id: 'emp-1' });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });
});

