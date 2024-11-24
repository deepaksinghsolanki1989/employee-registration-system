import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PaintingJobsService } from './painting-jobs.service';
import { CreatePaintingJobDto } from './dto/create-painting-job.dto';
import { UpdatePaintingJobDto } from './dto/update-painting-job.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '@/auth/guard';

@UseGuards(AccessTokenGuard)
@ApiTags('Painting Jobs')
@Controller('painting-jobs')
export class PaintingJobsController {
  constructor(private readonly paintingJobsService: PaintingJobsService) {}

  @Post()
  async create(@Body() createPaintingJobDto: CreatePaintingJobDto) {
    await this.paintingJobsService.create(createPaintingJobDto);

    return {
      data: null,
      error: null,
      message: 'Painting Job created successfully.',
    };
  }

  @Get()
  async findAll() {
    const data = await this.paintingJobsService.findAll();

    return {
      data,
      error: null,
      message: 'Painting Jobs fetched successfully.',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.paintingJobsService.findOne(id);

    return {
      data,
      error: null,
      message: 'Painting Job fetched successfully.',
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePaintingJobDto: UpdatePaintingJobDto,
  ) {
    await this.paintingJobsService.update(id, updatePaintingJobDto);

    return {
      data: null,
      error: null,
      message: 'Painting Jobs fetched successfully.',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.paintingJobsService.remove(id);

    return {
      data: null,
      error: null,
      message: 'Painting Jobs fetched successfully.',
    };
  }
}
