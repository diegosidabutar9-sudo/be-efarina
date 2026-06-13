import { Injectable } from '@nestjs/common';

@Injectable()
export class PayrollServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
