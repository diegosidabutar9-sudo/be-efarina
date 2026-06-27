import { ApiProperty } from '@nestjs/swagger';

export class CreatePayrollDto {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  period_start: Date;

  @ApiProperty()
  period_end: Date;

  @ApiProperty()
  basic_salary: number;

  @ApiProperty({ required: false })
  allowances?: number;

  @ApiProperty({ required: false })
  deductions?: number;

  @ApiProperty()
  net_salary: number;

  @ApiProperty()
  status: string;
}

