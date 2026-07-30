import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@app/common/auth';
import { AttendanceServiceController } from './attendance-service.controller';
import { AttendanceServiceService } from './attendance-service.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, PassportModule],
  controllers: [AttendanceServiceController],
  providers: [AttendanceServiceService, JwtStrategy],
})
export class AttendanceServiceModule {}
