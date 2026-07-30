import { ApiProperty } from '@nestjs/swagger';

export class CreatePayrollDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID user (UUID) karyawan' })
  user_id: string;

  @ApiProperty({ example: '2023-10-01', description: 'Tanggal awal periode penggajian' })
  period_start: Date;

  @ApiProperty({ example: '2023-10-31', description: 'Tanggal akhir periode penggajian' })
  period_end: Date;

  @ApiProperty({ example: 5000000, description: 'Gaji pokok karyawan' })
  basic_salary: number;

  @ApiProperty({ required: false, example: 500000, description: 'Total tunjangan (Makan, Transport, dsb)' })
  allowances?: number;

  @ApiProperty({ required: false, example: 100000, description: 'Total potongan (Koperasi, BPJS, dsb)' })
  deductions?: number;

  @ApiProperty({ example: 5400000, description: 'Total gaji bersih (Take home pay)' })
  net_salary: number;

  @ApiProperty({ example: 'PAID', description: 'Status pembayaran (PENDING, PAID)' })
  status: string;
}

