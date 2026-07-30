import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreatePayrollDto } from './dto/create-payroll.dto';
import { UpdatePayrollDto } from './dto/update-payroll.dto';

@Injectable()
export class PayrollServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPayrollDto: any) {
    const periodStart = new Date(createPayrollDto.period || new Date());
    const periodEnd = new Date(periodStart);
    periodEnd.setMonth(periodEnd.getMonth() + 1);
    periodEnd.setDate(0); 

    const deductions = Number(createPayrollDto.totalDeduction || 0) + Number(createPayrollDto.bpjsDeduction || 0) + Number(createPayrollDto.taxDeduction || 0);

    const created = await this.prisma.payrolls.create({
      data: {
        user_id: createPayrollDto.userId,
        period_start: periodStart,
        period_end: periodEnd,
        basic_salary: createPayrollDto.basicSalary,
        allowances: createPayrollDto.totalAllowance,
        deductions: deductions,
        net_salary: createPayrollDto.netSalary,
        status: createPayrollDto.status || 'DRAFT'
      }
    });
    return this.mapToDto(created);
  }

  async findAll(userId?: string) {
    const records = await this.prisma.payrolls.findMany({
      where: userId ? { user_id: userId } : undefined,
      orderBy: { period_start: 'desc' },
    });
    return records.map(this.mapToDto);
  }

  private mapToDto(payroll: any) {
    return {
      id: payroll.id,
      userId: payroll.user_id,
      period: payroll.period_start,
      basicSalary: Number(payroll.basic_salary),
      totalAllowance: Number(payroll.allowances),
      totalDeduction: Number(payroll.deductions),
      bpjsDeduction: 0,
      taxDeduction: 0,
      netSalary: Number(payroll.net_salary),
      status: payroll.status,
      createdAt: payroll.created_at
    };
  }

  async findOne(id: string) {
    const payroll = await this.prisma.payrolls.findUnique({
      where: { id },
    });
    if (!payroll) {
      throw new NotFoundException('Payroll with ID ' + id + ' not found');
    }
    return this.mapToDto(payroll);
  }

  async update(id: string, updatePayrollDto: any) {
    await this.findOne(id);
    
    const dataToUpdate: any = { updated_at: new Date() };
    if (updatePayrollDto.status) dataToUpdate.status = updatePayrollDto.status;
    if (updatePayrollDto.netSalary !== undefined) dataToUpdate.net_salary = updatePayrollDto.netSalary;
    if (updatePayrollDto.basicSalary !== undefined) dataToUpdate.basic_salary = updatePayrollDto.basicSalary;
    if (updatePayrollDto.totalAllowance !== undefined) dataToUpdate.allowances = updatePayrollDto.totalAllowance;
    if (updatePayrollDto.totalDeduction !== undefined || updatePayrollDto.bpjsDeduction !== undefined || updatePayrollDto.taxDeduction !== undefined) {
       dataToUpdate.deductions = Number(updatePayrollDto.totalDeduction || 0) + Number(updatePayrollDto.bpjsDeduction || 0) + Number(updatePayrollDto.taxDeduction || 0);
    }

    const updated = await this.prisma.payrolls.update({
      where: { id },
      data: dataToUpdate,
    });
    return this.mapToDto(updated);
  }

  async remove(id: string) {
    await this.findOne(id);
    const deleted = await this.prisma.payrolls.delete({
      where: { id },
    });
    return this.mapToDto(deleted);
  }
}
