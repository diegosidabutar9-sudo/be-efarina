import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    return this.prisma.attendances.create({
      data: createAttendanceDto,
    });
  }

  async findAll() {
    return this.prisma.attendances.findMany({
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const attendance = await this.prisma.attendances.findUnique({
      where: { id },
    });
    if (!attendance) {
      throw new NotFoundException('Attendance with ID ' + id + ' not found');
    }
    return attendance;
  }

  async update(id: string, updateAttendanceDto: UpdateAttendanceDto) {
    await this.findOne(id);
    return this.prisma.attendances.update({
      where: { id },
      data: {
        ...updateAttendanceDto,
        updated_at: new Date(),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.attendances.delete({
      where: { id },
    });
  }
}
