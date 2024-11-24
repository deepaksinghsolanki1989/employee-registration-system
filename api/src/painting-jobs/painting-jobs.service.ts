import { Injectable } from '@nestjs/common';
import { CreatePaintingJobDto } from './dto/create-painting-job.dto';
import { UpdatePaintingJobDto } from './dto/update-painting-job.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class PaintingJobsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePaintingJobDto) {
    return await this.prisma.paintingJob.create({
      data: {
        title: dto.title,
        description: dto.description,
        // dueDate: dto.dueDate,
      },
    });
  }

  async findAll() {
    return await this.prisma.paintingJob.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        dueDate: true,
        createdAt: true,
      },
    });
  }
  async findOne(id: string) {
    return await this.prisma.paintingJob.findFirst({
      select: {
        id: true,
        title: true,
        description: true,
        dueDate: true,
        createdAt: true,
      },
      where: { id },
    });
  }

  async update(id: string, dto: UpdatePaintingJobDto) {
    return await this.prisma.paintingJob.update({
      data: {
        title: dto.title,
        description: dto.description,
        // dueDate: dto.dueDate,
      },
      where: { id },
    });
  }

  async remove(id: string) {
    return await this.prisma.paintingJob.delete({
      where: { id },
    });
  }
}
