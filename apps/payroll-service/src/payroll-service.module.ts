import { Module } from '@nestjs/common';
import { PayrollServiceController } from './payroll-service.controller';
import { PayrollServiceService } from './payroll-service.service';

@Module({
  imports: [],
  controllers: [PayrollServiceController],
  providers: [PayrollServiceService],
})
export class PayrollServiceModule {}
