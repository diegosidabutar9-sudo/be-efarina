import { Module } from '@nestjs/common';
import { PenjadwalanServiceController } from './penjadwalan-service.controller';
import { PenjadwalanServiceService } from './penjadwalan-service.service';

@Module({
  imports: [],
  controllers: [PenjadwalanServiceController],
  providers: [PenjadwalanServiceService],
})
export class PenjadwalanServiceModule {}
