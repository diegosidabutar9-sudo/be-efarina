import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus, ParseUUIDPipe, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { PayrollServiceService } from './payroll-service.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';
import { PayrollResponseDto } from './dto/response.dto';
import { JwtAuthGuard, RolesGuard, Roles } from '@app/common/auth';

@ApiTags('Payroll')
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Unauthorized - Token tidak valid atau kadaluarsa.' })
@ApiResponse({ status: 403, description: 'Forbidden - Anda tidak memiliki akses ke resource ini.' })
@ApiResponse({ status: 500, description: 'Internal Server Error.' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payroll')
export class PayrollServiceController {
  constructor(private readonly payrollServiceService: PayrollServiceService) {}

  @Get()
  @ApiOperation({ summary: 'Mendapatkan daftar semua data penggajian' })
  @ApiResponse({ status: 200, description: 'Berhasil mendapatkan data penggajian.', type: [PayrollResponseDto] })
  async getAllPayrolls(@Req() req: any) {
    const user = req.user;
    if (user.role === 'EMPLOYEE') {
      return this.payrollServiceService.findAll(user.id);
    }
    return this.payrollServiceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan detail penggajian berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'ID Penggajian' })
  @ApiResponse({ status: 200, description: 'Data penggajian ditemukan.', type: PayrollResponseDto })
  @ApiResponse({ status: 404, description: 'Data tidak ditemukan.' })
  async getPayrollById(@Param('id', ParseUUIDPipe) id: string, @Req() req: any) {
    const payroll = await this.payrollServiceService.findOne(id);
    if (req.user.role === 'EMPLOYEE' && payroll.userId !== req.user.id) {
      throw new ForbiddenException('Anda hanya bisa melihat slip gaji Anda sendiri');
    }
    return payroll;
  }

  @Post()
  @Roles('ADMIN', 'KEUANGAN')
  @ApiOperation({ summary: 'Membuat data penggajian baru' })
  @ApiBody({ type: CreatePayrollDto, description: 'Data penggajian yang akan dibuat' })
  @ApiResponse({ status: 201, description: 'Data berhasil dibuat.', type: PayrollResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request - Data yang dikirim tidak valid.' })
  async createPayroll(@Body() createPayrollDto: CreatePayrollDto) {
    return this.payrollServiceService.create(createPayrollDto);
  }

  @Put(':id')
  @Roles('ADMIN', 'KEUANGAN')
  @ApiOperation({ summary: 'Memperbarui data penggajian' })
  @ApiParam({ name: 'id', description: 'ID Penggajian yang ingin diupdate' })
  @ApiBody({ type: UpdatePayrollDto })
  @ApiResponse({ status: 200, description: 'Data penggajian berhasil diupdate.', type: PayrollResponseDto })
  @ApiResponse({ status: 400, description: 'Bad Request - Data yang dikirim tidak valid.' })
  @ApiResponse({ status: 404, description: 'Not Found - Data tidak ditemukan.' })
  async updatePayroll(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePayrollDto: UpdatePayrollDto,
  ) {
    return this.payrollServiceService.update(id, updatePayrollDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'KEUANGAN')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Menghapus data penggajian' })
  @ApiParam({ name: 'id', description: 'ID Penggajian yang ingin dihapus' })
  @ApiResponse({ status: 204, description: 'Data penggajian berhasil dihapus.' })
  async deletePayroll(@Param('id', ParseUUIDPipe) id: string) {
    await this.payrollServiceService.remove(id);
  }
}

