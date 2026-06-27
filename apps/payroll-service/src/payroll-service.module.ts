import { Module } from '@nestjs/common';
import { PayrollServiceController } from './payroll-service.controller';
import { PayrollServiceService } from './payroll-service.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PayrollServiceController],
  providers: [PayrollServiceService],
})
export class PayrollServiceModule {}
