import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@app/common/auth';
import { PayrollServiceController } from './payroll-service.controller';
import { PayrollServiceService } from './payroll-service.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [PayrollServiceController],
  providers: [PayrollServiceService, JwtStrategy],
})
export class PayrollServiceModule {}
