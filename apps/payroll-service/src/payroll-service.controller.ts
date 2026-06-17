import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PayrollServiceService } from './payroll-service.service';

// Dummy DTO untuk Swagger
class CreatePayrollDto {
  employeeId: string;
  amount: number;
}

class UpdatePayrollDto {
  amount?: number;
}

@ApiTags('Payroll')
@Controller('payroll')
export class PayrollServiceController {
  constructor(private readonly payrollServiceService: PayrollServiceService) {}

  @Get()
  @ApiOperation({ summary: 'Mendapatkan daftar semua data penggajian' })
  @ApiResponse({ status: 200, description: 'Berhasil mendapatkan data.' })
  getAllPayrolls() {
    return [
      { id: 1, employeeId: 'EMP-001', amount: 5000000 },
      { id: 2, employeeId: 'EMP-002', amount: 6000000 },
    ];
  }

  @Get(':id')
  @ApiOperation({ summary: 'Mendapatkan detail penggajian berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'ID Penggajian' })
  @ApiResponse({ status: 200, description: 'Data ditemukan.' })
  @ApiResponse({ status: 404, description: 'Data tidak ditemukan.' })
  getPayrollById(@Param('id') id: string) {
    return { id, employeeId: 'EMP-001', amount: 5000000 };
  }

  @Post()
  @ApiOperation({ summary: 'Membuat data penggajian baru' })
  @ApiBody({ type: CreatePayrollDto, description: 'Data penggajian yang akan dibuat' })
  @ApiResponse({ status: 201, description: 'Data berhasil dibuat.' })
  createPayroll(@Body() createPayrollDto: CreatePayrollDto) {
    return { id: 3, ...createPayrollDto };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Memperbarui data penggajian' })
  @ApiParam({ name: 'id', description: 'ID Penggajian yang ingin diupdate' })
  @ApiBody({ type: UpdatePayrollDto })
  @ApiResponse({ status: 200, description: 'Data berhasil diupdate.' })
  updatePayroll(@Param('id') id: string, @Body() updatePayrollDto: UpdatePayrollDto) {
    return { id, ...updatePayrollDto, status: 'updated' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Menghapus data penggajian' })
  @ApiParam({ name: 'id', description: 'ID Penggajian yang ingin dihapus' })
  @ApiResponse({ status: 204, description: 'Data berhasil dihapus.' })
  deletePayroll(@Param('id') id: string) {
    return; // Tidak mengembalikan apa-apa (204 No Content)
  }
}
