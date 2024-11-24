import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  async findAll() {
    const data = await this.statisticsService.findAll();

    return {
      data,
      error: null,
      message: 'Statistics fetched successfully.',
    };
  }
}
