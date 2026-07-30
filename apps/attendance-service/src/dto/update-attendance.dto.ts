import { ApiProperty } from '@nestjs/swagger';

export class UpdateAttendanceDto {
  @ApiProperty({ required: false, example: '2023-10-15T08:00:00Z', description: 'Waktu check in karyawan' })
  check_in?: Date;

  @ApiProperty({ required: false, example: '2023-10-15T17:00:00Z', description: 'Waktu check out karyawan' })
  check_out?: Date;

  @ApiProperty({ required: false, example: 'HADIR', description: 'Status absensi (HADIR, ALFA, SAKIT, IZIN)' })
  status?: string;
}
