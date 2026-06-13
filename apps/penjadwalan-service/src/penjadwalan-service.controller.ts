import { Controller, Get } from '@nestjs/common';
import { PenjadwalanServiceService } from './penjadwalan-service.service';

@Controller()
export class PenjadwalanServiceController {
  constructor(private readonly penjadwalanServiceService: PenjadwalanServiceService) {}

  @Get()
  getHello(): string {
    return this.penjadwalanServiceService.getHello();
  }
}
