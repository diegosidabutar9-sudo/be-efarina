import { ApiProperty } from '@nestjs/swagger';

export class DepartmentDto {
  @ApiProperty({ example: 'dept-1' })
  id: string;

  @ApiProperty({ example: 'Medis' })
  name: string;
}

export class PositionDto {
  @ApiProperty({ example: 'pos-1' })
  id: string;

  @ApiProperty({ example: 'Dokter Umum' })
  name: string;
}

export class EmployeeResponseDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'HRD-26-0001' })
  id_pegawai: string;

  @ApiProperty({ example: 'Dr. Jane Doe' })
  name: string;

  @ApiProperty({ example: 'jane.doe@example.com' })
  email: string;

  @ApiProperty({ example: '081234567890' })
  phoneNumber: string;

  @ApiProperty({ example: 'dept-1' })
  departmentId: string;

  @ApiProperty({ example: 'pos-1' })
  positionId: string;

  @ApiProperty({ type: DepartmentDto })
  department: DepartmentDto;

  @ApiProperty({ type: PositionDto })
  position: PositionDto;

  @ApiProperty({ example: '2020-01-15' })
  joinDate: string;
}
