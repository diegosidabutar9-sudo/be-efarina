import { ApiProperty } from '@nestjs/swagger';

export class UpdatePayrollDto {
  @ApiProperty({ required: false, example: 'PAID', description: 'Status pembayaran (PENDING, PAID)' })
  status?: string;

  @ApiProperty({ required: false, example: 500000, description: 'Total tunjangan (Makan, Transport, dsb)' })
  allowances?: number;

  @ApiProperty({ required: false, example: 100000, description: 'Total potongan (Koperasi, BPJS, dsb)' })
  deductions?: number;

  @ApiProperty({ required: false, example: 5400000, description: 'Total gaji bersih (Take home pay)' })
  net_salary?: number;
}

