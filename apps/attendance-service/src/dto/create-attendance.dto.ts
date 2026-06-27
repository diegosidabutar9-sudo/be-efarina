import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceDto {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  date: Date;

  @ApiProperty({ required: false })
  check_in?: Date;

  @ApiProperty({ required: false })
  check_out?: Date;

  @ApiProperty()
  status: string;
}
