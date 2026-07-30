import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PenjadwalanServiceService } from './penjadwalan-service.service';

@ApiTags('Penjadwalan Shift')
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Unauthorized - Token tidak valid atau kadaluarsa.' })
@ApiResponse({ status: 500, description: 'Internal Server Error.' })
@Controller()
export class PenjadwalanServiceController {
  constructor(private readonly penjadwalanServiceService: PenjadwalanServiceService) {}

  @Get()
  @ApiOperation({ summary: 'Cek status penjadwalan' })
  @ApiResponse({ status: 200, description: 'Service penjadwalan aktif.' })
  getHello(): string {
    return this.penjadwalanServiceService.getHello();
  }
}
