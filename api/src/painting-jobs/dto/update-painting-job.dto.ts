import { PartialType } from '@nestjs/swagger';
import { CreatePaintingJobDto } from './create-painting-job.dto';

export class UpdatePaintingJobDto extends PartialType(CreatePaintingJobDto) {}
