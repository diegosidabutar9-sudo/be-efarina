import { ApiProperty } from '@nestjs/swagger';

export class AttendanceResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'ID Absensi' })
  id: string;

  @ApiProperty({ example: 'user-uuid-1234', description: 'ID User (Karyawan)' })
  user_id: string;

  @ApiProperty({ example: '2023-10-15T00:00:00.000Z', description: 'Tanggal Absensi' })
  date: Date;

  @ApiProperty({ required: false, example: '2023-10-15T08:00:00.000Z', description: 'Waktu Check In' })
  check_in?: Date;

  @ApiProperty({ required: false, example: '2023-10-15T17:00:00.000Z', description: 'Waktu Check Out' })
  check_out?: Date;

  @ApiProperty({ example: 'HADIR', description: 'Status Absensi' })
  status: string;

  @ApiProperty({ example: '2023-10-15T08:00:00.000Z', description: 'Waktu Dibuat' })
  created_at: Date;

  @ApiProperty({ example: '2023-10-15T17:00:00.000Z', description: 'Waktu Diupdate' })
  updated_at: Date;
}

export class RekapSummaryDto {
  @ApiProperty({ example: 20, description: 'Total kehadiran' })
  totalHadir: number;

  @ApiProperty({ example: 2, description: 'Total keterlambatan' })
  totalTelat: number;

  @ApiProperty({ example: 1, description: 'Total izin/cuti' })
  totalCuti: number;
}

export class RekapResponseDto {
  @ApiProperty({ type: RekapSummaryDto })
  summary: RekapSummaryDto;

  @ApiProperty({ type: [AttendanceResponseDto], description: 'Daftar data absensi' })
  data: AttendanceResponseDto[];
}

export class CreateAttendanceResponseDto {
  @ApiProperty({ example: 201 })
  status: number;

  @ApiProperty({ example: 'Attendance created successfully' })
  message: string;

  @ApiProperty({ type: AttendanceResponseDto })
  data: AttendanceResponseDto;
}
