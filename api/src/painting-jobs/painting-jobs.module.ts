import { Module } from '@nestjs/common';
import { PaintingJobsService } from './painting-jobs.service';
import { PaintingJobsController } from './painting-jobs.controller';

@Module({
  controllers: [PaintingJobsController],
  providers: [PaintingJobsService],
})
export class PaintingJobsModule {}
