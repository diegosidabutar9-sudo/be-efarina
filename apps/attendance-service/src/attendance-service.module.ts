import { Module } from '@nestjs/common';
import { AttendanceServiceController } from './attendance-service.controller';
import { AttendanceServiceService } from './attendance-service.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AttendanceServiceController],
  providers: [AttendanceServiceService],
})
export class AttendanceServiceModule {}
