import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaintingJobDto {
  @ApiProperty({ description: 'Title' })
  @IsString({ message: 'Title must be a string.' })
  @IsNotEmpty({ message: 'Title should not be empty.' })
  title: string;

  @ApiProperty({ description: 'Description' })
  @IsString({ message: 'Description must be a string.' })
  @IsNotEmpty({ message: 'Description should not be empty.' })
  description: string;

  // @ApiProperty({ description: 'Due Date' })
  // @IsString({ message: 'dueDate must be a string.' })
  // @IsNotEmpty({ message: 'dueDate should not be empty.' })
  // dueDate: string;
}
