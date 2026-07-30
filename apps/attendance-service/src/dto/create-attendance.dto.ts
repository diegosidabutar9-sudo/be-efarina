import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID user (UUID) karyawan' })
  user_id: string;

  @ApiProperty({ example: '2023-10-15', description: 'Tanggal absensi dalam format YYYY-MM-DD' })
  date: Date;

  @ApiProperty({ required: false, example: '2023-10-15T08:00:00Z', description: 'Waktu check in karyawan' })
  check_in?: Date;

  @ApiProperty({ required: false, example: '2023-10-15T17:00:00Z', description: 'Waktu check out karyawan' })
  check_out?: Date;

  @ApiProperty({ example: 'HADIR', description: 'Status absensi (HADIR, ALFA, SAKIT, IZIN)' })
  status: string;
}
