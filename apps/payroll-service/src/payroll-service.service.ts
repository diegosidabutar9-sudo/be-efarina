import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';

@Injectable()
export class PayrollServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPayrollDto: CreatePayrollDto) {
    return this.prisma.payrolls.create({
      data: createPayrollDto,
    });
  }

  async findAll() {
    return this.prisma.payrolls.findMany({
      orderBy: { period_start: 'desc' },
    });
  }

  async findOne(id: string) {
    const payroll = await this.prisma.payrolls.findUnique({
      where: { id },
    });
    if (!payroll) {
      throw new NotFoundException('Payroll with ID ' + id + ' not found');
    }
    return payroll;
  }

  async update(id: string, updatePayrollDto: UpdatePayrollDto) {
    await this.findOne(id);
    return this.prisma.payrolls.update({
      where: { id },
      data: {
        ...updatePayrollDto,
        updated_at: new Date(),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.payrolls.delete({
      where: { id },
    });
  }
}
