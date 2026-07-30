import { ApiProperty } from '@nestjs/swagger';

export class PayrollResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID Slip Gaji' })
  id: string;

  @ApiProperty({ example: 'user-uuid-1234', description: 'ID User (Karyawan)' })
  userId: string;

  @ApiProperty({ example: '2023-10-01T00:00:00.000Z', description: 'Tanggal awal periode penggajian' })
  period_start: Date;

  @ApiProperty({ example: '2023-10-31T00:00:00.000Z', description: 'Tanggal akhir periode penggajian' })
  period_end: Date;

  @ApiProperty({ example: 5000000, description: 'Gaji Pokok' })
  basic_salary: number;

  @ApiProperty({ example: 500000, description: 'Tunjangan' })
  allowances: number;

  @ApiProperty({ example: 100000, description: 'Potongan' })
  deductions: number;

  @ApiProperty({ example: 5400000, description: 'Total Gaji Bersih' })
  net_salary: number;

  @ApiProperty({ example: 'PAID', description: 'Status Pembayaran' })
  status: string;

  @ApiProperty({ example: '2023-11-01T08:00:00.000Z', description: 'Waktu Dibuat' })
  created_at: Date;

  @ApiProperty({ example: '2023-11-01T08:00:00.000Z', description: 'Waktu Diupdate' })
  updated_at: Date;
}
