import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AttendanceServiceService } from './attendance-service.service';

// Dummy DTO untuk Swagger
class CreateAttendanceDto {
  employeeId: string;
  status: string;
  date: string;
}

class UpdateAttendanceDto {
  status?: string;
  date?: string;
}

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceServiceController {
  constructor(private readonly attendanceServiceService: AttendanceServiceService) {}

  @Get()
  @ApiOperation({ summary: 'Mendapatkan daftar semua data absensi/kehadiran' })
  @ApiResponse({ status: 200, description: 'Berhasil mendapatkan data absensi.' })
  getAllAttendances() {
    return [
      { id: 1, employeeId: 'EMP-001', status: 'Hadir', date: '2023-10-01' },
      { id: 2, employeeId: 'EMP-002', status: 'Sakit', date: '2023-10-01' },
    ];
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan detail absensi berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'ID Absensi' })
  @ApiResponse({ status: 200, description: 'Data absensi ditemukan.' })
  @ApiResponse({ status: 404, description: 'Data tidak ditemukan.' })
  getAttendanceById(@Param('id') id: string) {
    return { id, employeeId: 'EMP-001', status: 'Hadir', date: '2023-10-01' };
  }

  @Post()
  @ApiOperation({ summary: 'Membuat data absensi baru (Check-in)' })
  @ApiBody({ type: CreateAttendanceDto, description: 'Data absensi yang akan dibuat' })
  @ApiResponse({ status: 201, description: 'Data berhasil dibuat.' })
  createAttendance(@Body() createAttendanceDto: CreateAttendanceDto) {
    return { id: 3, ...createAttendanceDto };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Memperbarui data absensi' })
  @ApiParam({ name: 'id', description: 'ID Absensi yang ingin diupdate' })
  @ApiBody({ type: UpdateAttendanceDto })
  @ApiResponse({ status: 200, description: 'Data absensi berhasil diupdate.' })
  updateAttendance(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return { id, ...updateAttendanceDto, isUpdated: true };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Menghapus data absensi' })
  @ApiParam({ name: 'id', description: 'ID Absensi yang ingin dihapus' })
  @ApiResponse({ status: 204, description: 'Data absensi berhasil dihapus.' })
  deleteAttendance(@Param('id') id: string) {
    return; // Tidak mengembalikan apa-apa (204 No Content)
  }
}
