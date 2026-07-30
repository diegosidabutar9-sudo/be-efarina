import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { KaryawanServiceService } from './karyawan-service.service';
import { EmployeeResponseDto, DepartmentDto, PositionDto } from './dto/response.dto';

@ApiTags('Karyawan & HRIS')
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Unauthorized - Token tidak valid atau kadaluarsa.' })
@ApiResponse({ status: 500, description: 'Internal Server Error.' })
@Controller()
export class KaryawanServiceController {
  constructor(private readonly karyawanServiceService: KaryawanServiceService) {}

  @Get('employees')
  @ApiOperation({ summary: 'Mendapatkan daftar semua karyawan' })
  @ApiResponse({ status: 200, description: 'Daftar karyawan berhasil diambil.', type: [EmployeeResponseDto] })
  getEmployees() {
    return [
      {
        id: '34765926-ce92-4744-bd6b-9655f2ec8b53',
        userId: '34765926-ce92-4744-bd6b-9655f2ec8b53',
        id_pegawai: 'HRD-26-0001',
        name: 'Dr. Jane Doe',
        email: 'jane.doe@example.com',
        phoneNumber: '081234567890',
        departmentId: 'dept-1',
        positionId: 'pos-1',
        department: { name: 'Medis' },
        position: { name: 'Dokter Umum' },
        joinDate: '2020-01-15'
      },
      {
        id: '2bcb6b5d-b99b-4e5b-bf87-cc785aa121ef',
        userId: '2bcb6b5d-b99b-4e5b-bf87-cc785aa121ef',
        id_pegawai: 'HRD-26-0002',
        name: 'John Smith (Pegawai)',
        email: 'pegawai@efarina.com',
        phoneNumber: '081234567891',
        departmentId: 'dept-2',
        positionId: 'pos-2',
        department: { name: 'IT' },
        position: { name: 'Staff' },
        joinDate: '2021-03-10'
      }
    ];
  }

  @Get('employees/:id')
  @ApiOperation({ summary: 'Mendapatkan detail karyawan berdasarkan ID atau ID Pegawai' })
  getEmployeeById(@Param('id') id: string) {
    const employees = this.getEmployees();
    const employee = employees.find(emp => emp.id === id || emp.id_pegawai === id || emp.userId === id);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  @Get('departments')
  @ApiOperation({ summary: 'Mendapatkan daftar departemen' })
  @ApiResponse({ status: 200, description: 'Daftar departemen berhasil diambil.', type: [DepartmentDto] })
  getDepartments() {
    return [
      { id: 'dept-1', name: 'Medis' },
      { id: 'dept-2', name: 'IT' },
      { id: 'dept-3', name: 'HRD' }
    ];
  }

  @Get('positions')
  @ApiOperation({ summary: 'Mendapatkan daftar jabatan' })
  @ApiResponse({ status: 200, description: 'Daftar jabatan berhasil diambil.', type: [PositionDto] })
  getPositions() {
    return [
      { id: 'pos-1', name: 'Dokter Umum' },
      { id: 'pos-2', name: 'Staff' },
      { id: 'pos-3', name: 'Manajer' }
    ];
  }
}
