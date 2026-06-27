import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceServiceController } from './attendance-service.controller';
import { AttendanceServiceService } from './attendance-service.service';

describe('AttendanceServiceController', () => {
  let controller: AttendanceServiceController;
  let service: AttendanceServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceServiceController],
      providers: [
        {
          provide: AttendanceServiceService,
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

    controller = module.get<AttendanceServiceController>(AttendanceServiceController);
    service = module.get<AttendanceServiceService>(AttendanceServiceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return an array of attendances', async () => {
    const result = await controller.getAllAttendances();
    expect(result).toEqual([{ id: '1', user_id: 'emp-1' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('findOne should return a single attendance', async () => {
    const result = await controller.getAttendanceById('1');
    expect(result).toEqual({ id: '1', user_id: 'emp-1' });
    expect(service.findOne).toHaveBeenCalledWith('1');
  });
});

