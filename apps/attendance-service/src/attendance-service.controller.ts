import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus, ParseUUIDPipe, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AttendanceServiceService } from './attendance-service.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { RekapResponseDto, AttendanceResponseDto, CreateAttendanceResponseDto } from './dto/response.dto';
import { JwtAuthGuard, RolesGuard, Roles } from '@app/common/auth';

@ApiTags('Attendance')
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Unauthorized - Token tidak valid atau kadaluarsa.' })
@ApiResponse({ status: 403, description: 'Forbidden - Anda tidak memiliki akses ke resource ini.' })
@ApiResponse({ status: 500, description: 'Internal Server Error.' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('attendance')
export class AttendanceServiceController {
  constructor(private readonly attendanceServiceService: AttendanceServiceService) {}

  @Get('rekap/:type')
  @ApiOperation({ summary: 'Mendapatkan rekap absensi' })
  @ApiParam({ name: 'type', description: 'Tipe rekap: harian, mingguan, bulanan' })
  @ApiResponse({ status: 200, description: 'Rekap absensi berhasil diambil.', type: RekapResponseDto })
  async getRekap(@Param('type') type: string, @Req() req: any) {
    const user = req.user;
    if (user.role === 'EMPLOYEE') {
      return this.attendanceServiceService.getRekap(type, user.id);
    }
    return this.attendanceServiceService.getRekap(type);
  }

  @Get()
  @ApiOperation({ summary: 'Mendapatkan daftar semua data absensi/kehadiran' })
  @ApiResponse({ status: 200, description: 'Berhasil mendapatkan data absensi.', type: [AttendanceResponseDto] })
  async getAllAttendances(@Req() req: any) {
    const user = req.user;
    if (user.role === 'EMPLOYEE') {
      return this.attendanceServiceService.findAll(user.id);
    }
    return this.attendanceServiceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan detail absensi berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'ID Absensi' })
  @ApiResponse({ status: 200, description: 'Data absensi ditemukan.', type: AttendanceResponseDto })
  @ApiResponse({ status: 404, description: 'Data tidak ditemukan.' })
  async getAttendanceById(@Param('id', ParseUUIDPipe) id: string, @Req() req: any) {
    const attendance = await this.attendanceServiceService.findOne(id);
    if (req.user.role === 'EMPLOYEE' && attendance.user_id !== req.user.id) {
      throw new ForbiddenException('Anda hanya bisa melihat presensi Anda sendiri');
    }
    return attendance;
  }

  @Post()
  @ApiOperation({ summary: 'Membuat data absensi baru (Check-in)' })
  @ApiBody({ type: CreateAttendanceDto, description: 'Data absensi yang akan dibuat' })
  @ApiResponse({ status: 201, description: 'Data berhasil dibuat.', type: CreateAttendanceResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request - Data yang dikirim tidak valid.' })
  async createAttendance(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceServiceService.create(createAttendanceDto);
  }

  @Put(':id')
  @Roles('ADMIN', 'SDM')
  @ApiOperation({ summary: 'Memperbarui data absensi' })
  @ApiParam({ name: 'id', description: 'ID Absensi yang ingin diupdate' })
  @ApiBody({ type: UpdateAttendanceDto })
  @ApiResponse({ status: 200, description: 'Data absensi berhasil diupdate.', type: AttendanceResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request - Data yang dikirim tidak valid.' })
  @ApiResponse({ status: 404, description: 'Not Found - Data tidak ditemukan.' })
  async updateAttendance(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendanceServiceService.update(id, updateAttendanceDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SDM')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Menghapus data absensi' })
  @ApiParam({ name: 'id', description: 'ID Absensi yang ingin dihapus' })
  @ApiResponse({ status: 204, description: 'Data absensi berhasil dihapus.' })
  async deleteAttendance(@Param('id', ParseUUIDPipe) id: string) {
    await this.attendanceServiceService.remove(id);
  }
}

