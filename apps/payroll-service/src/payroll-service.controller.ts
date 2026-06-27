import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PayrollServiceService } from './payroll-service.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';

@ApiTags('Payroll')
@Controller('payroll')
export class PayrollServiceController {
  constructor(private readonly payrollServiceService: PayrollServiceService) {}

  @Get()
  @ApiOperation({ summary: 'Mendapatkan daftar semua data penggajian' })
  @ApiResponse({ status: 200, description: 'Berhasil mendapatkan data penggajian.' })
  async getAllPayrolls() {
    return this.payrollServiceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan detail penggajian berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'ID Penggajian' })
  @ApiResponse({ status: 200, description: 'Data penggajian ditemukan.' })
  @ApiResponse({ status: 404, description: 'Data tidak ditemukan.' })
  async getPayrollById(@Param('id', ParseUUIDPipe) id: string) {
    return this.payrollServiceService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Membuat data penggajian baru' })
  @ApiBody({ type: CreatePayrollDto, description: 'Data penggajian yang akan dibuat' })
  @ApiResponse({ status: 201, description: 'Data berhasil dibuat.' })
  async createPayroll(@Body() createPayrollDto: CreatePayrollDto) {
    return this.payrollServiceService.create(createPayrollDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Memperbarui data penggajian' })
  @ApiParam({ name: 'id', description: 'ID Penggajian yang ingin diupdate' })
  @ApiBody({ type: UpdatePayrollDto })
  @ApiResponse({ status: 200, description: 'Data penggajian berhasil diupdate.' })
  async updatePayroll(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePayrollDto: UpdatePayrollDto,
  ) {
    return this.payrollServiceService.update(id, updatePayrollDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Menghapus data penggajian' })
  @ApiParam({ name: 'id', description: 'ID Penggajian yang ingin dihapus' })
  @ApiResponse({ status: 204, description: 'Data penggajian berhasil dihapus.' })
  async deletePayroll(@Param('id', ParseUUIDPipe) id: string) {
    await this.payrollServiceService.remove(id);
  }
}

