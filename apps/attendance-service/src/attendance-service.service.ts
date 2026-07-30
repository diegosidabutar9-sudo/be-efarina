import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Injectable()
export class AttendanceServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    try{
      const newData = this.prisma.attendances.create({
        data: createAttendanceDto,
      });
      return {
        status : 201,
        message : "Attendance created successfully",
        data : newData
      }
    }catch(error: any){
      throw new NotFoundException(error.message);
    }
  }

  async findAll(userId?: string) {
    return this.prisma.attendances.findMany({
      where: userId ? { user_id: userId } : undefined,
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

  async getRekap(type: string, userId?: string) {
    const now = new Date();
    let startDate = new Date();
    
    if (type === 'harian') {
      startDate.setHours(0, 0, 0, 0);
    } else if (type === 'mingguan') {
      startDate.setDate(now.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
    } else if (type === 'bulanan') {
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
    }

    const records = await this.prisma.attendances.findMany({
      where: {
        date: { gte: startDate },
        ...(userId ? { user_id: userId } : {})
      },
      orderBy: { date: 'desc' }
    });

    const summary = {
      totalHadir: records.filter(r => r.status.toLowerCase() === 'hadir').length,
      totalTelat: records.filter(r => r.status.toLowerCase() === 'terlambat').length,
      totalCuti: records.filter(r => r.status.toLowerCase() === 'cuti').length,
    };

    return { summary, data: records };
  }
}

