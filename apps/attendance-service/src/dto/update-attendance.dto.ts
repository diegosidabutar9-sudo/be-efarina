import { ApiProperty } from '@nestjs/swagger';

export class UpdateAttendanceDto {
  @ApiProperty({ required: false })
  check_in?: Date;

  @ApiProperty({ required: false })
  check_out?: Date;

  @ApiProperty({ required: false })
  status?: string;
}
