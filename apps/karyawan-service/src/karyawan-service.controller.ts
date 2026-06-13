import { Controller, Get } from '@nestjs/common';
import { KaryawanServiceService } from './karyawan-service.service';

@Controller()
export class KaryawanServiceController {
  constructor(private readonly karyawanServiceService: KaryawanServiceService) {}

  @Get()
  getHello(): string {
    return this.karyawanServiceService.getHello();
  }
}
