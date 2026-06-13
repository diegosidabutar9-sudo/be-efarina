import { Controller, Get } from '@nestjs/common';
import { PayrollServiceService } from './payroll-service.service';

@Controller()
export class PayrollServiceController {
  constructor(private readonly payrollServiceService: PayrollServiceService) {}

  @Get()
  getHello(): string {
    return this.payrollServiceService.getHello();
  }
}
