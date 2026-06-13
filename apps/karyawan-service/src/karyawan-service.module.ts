import { Module } from '@nestjs/common';
import { KaryawanServiceController } from './karyawan-service.controller';
import { KaryawanServiceService } from './karyawan-service.service';

@Module({
  imports: [],
  controllers: [KaryawanServiceController],
  providers: [KaryawanServiceService],
})
export class KaryawanServiceModule {}
