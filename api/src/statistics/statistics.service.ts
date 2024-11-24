import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.groupBy({
      by: ['createdAt'],
      _count: { id: true },
    });

    const paintingJobs = await this.prisma.paintingJob.groupBy({
      by: ['createdAt'],
      _count: { id: true },
    });

    let response = {};

    users.map((user) => {
      const date = user.createdAt.toISOString().split('T')[0];

      response = {
        ...response,
        [date]: {
          date,
          users: user._count.id,
          paintingJobs: 0,
        },
      };
    });

    paintingJobs.map((paintingJob) => {
      const date = paintingJob.createdAt.toISOString().split('T')[0];

      if (response[date]) {
        response[date] = {
          ...response[date],
          paintingJobs: paintingJob._count.id,
        };
      } else {
        response = {
          ...response,
          [date]: {
            date,
            users: 0,
            paintingJobs: paintingJob._count.id,
          },
        };
      }
    });

    return {
      totalUsers: 0,
      totalPaintingJobs: 0,
      chartData: Object.values(response),
    };
  }
}
