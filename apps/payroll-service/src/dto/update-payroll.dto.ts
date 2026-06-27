import { ApiProperty } from '@nestjs/swagger';

export class UpdatePayrollDto {
  @ApiProperty({ required: false })
  status?: string;

  @ApiProperty({ required: false })
  allowances?: number;

  @ApiProperty({ required: false })
  deductions?: number;

  @ApiProperty({ required: false })
  net_salary?: number;
}

