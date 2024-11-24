import { PrismaService } from '@/prisma/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        employeeCode: true,
        email: true,
        isActive: true,
        createdAt: true,
      },
      where: {
        employeeCode: { not: '' },
      },
    });
  }

  async approve(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new ForbiddenException('Employee details not found');
    }

    await this.prisma.user.update({
      where: { id },
      data: { isActive: true },
    });

    return true;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new ForbiddenException('Employee details not found');
    }

    await this.prisma.user.delete({ where: { id } });

    return true;
  }
}
