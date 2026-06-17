import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { AppService } from './app.service';

class HealthCheckResponse {
  @ApiProperty({ example: 'ok', description: 'Status dari server' })
  status: string;

  @ApiProperty({ example: '2023-10-01T12:00:00Z', description: 'Waktu server saat ini' })
  timestamp: string;

  @ApiProperty({ example: '1.0.0', description: 'Versi aplikasi' })
  version: string;
}

@ApiTags('System Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Mendapatkan sapaan dari server (Root)' })
  @ApiResponse({ status: 200, description: 'Server berjalan dengan baik.' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Mengecek status kesehatan server (Health Check)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Server dalam keadaan sehat dan siap menerima request.',
    type: HealthCheckResponse 
  })
  getHealth(): HealthCheckResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    };
  }
}
