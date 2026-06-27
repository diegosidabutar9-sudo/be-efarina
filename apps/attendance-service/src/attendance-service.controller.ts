import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AttendanceServiceService } from './attendance-service.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceServiceController {
  constructor(private readonly attendanceServiceService: AttendanceServiceService) {}

  @Get()
  @ApiOperation({ summary: 'Mendapatkan daftar semua data absensi/kehadiran' })
  @ApiResponse({ status: 200, description: 'Berhasil mendapatkan data absensi.' })
  async getAllAttendances() {
    return this.attendanceServiceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan detail absensi berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'ID Absensi' })
  @ApiResponse({ status: 200, description: 'Data absensi ditemukan.' })
  @ApiResponse({ status: 404, description: 'Data tidak ditemukan.' })
  async getAttendanceById(@Param('id', ParseUUIDPipe) id: string) {
    return this.attendanceServiceService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Membuat data absensi baru (Check-in)' })
  @ApiBody({ type: CreateAttendanceDto, description: 'Data absensi yang akan dibuat' })
  @ApiResponse({ status: 201, description: 'Data berhasil dibuat.' })
  async createAttendance(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceServiceService.create(createAttendanceDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Memperbarui data absensi' })
  @ApiParam({ name: 'id', description: 'ID Absensi yang ingin diupdate' })
  @ApiBody({ type: UpdateAttendanceDto })
  @ApiResponse({ status: 200, description: 'Data absensi berhasil diupdate.' })
  async updateAttendance(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendanceServiceService.update(id, updateAttendanceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Menghapus data absensi' })
  @ApiParam({ name: 'id', description: 'ID Absensi yang ingin dihapus' })
  @ApiResponse({ status: 204, description: 'Data absensi berhasil dihapus.' })
  async deleteAttendance(@Param('id', ParseUUIDPipe) id: string) {
    await this.attendanceServiceService.remove(id);
  }
}

