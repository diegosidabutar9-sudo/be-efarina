import { Injectable } from '@nestjs/common';

@Injectable()
export class KaryawanServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
