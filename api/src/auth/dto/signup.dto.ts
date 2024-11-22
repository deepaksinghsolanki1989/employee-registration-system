import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({ description: 'Full Name' })
  @IsString({ message: 'Full name must be a string.' })
  @IsNotEmpty({ message: 'Full name should not be empty.' })
  fullName: string;

  @ApiPropertyOptional({ description: 'Employee Code' })
  @IsString({ message: 'Employee code must be a string.' })
  employeeCode: string;

  @ApiProperty({ description: 'Email' })
  @IsEmail()
  @IsNotEmpty({ message: 'Email should not be empty.' })
  email: string;

  @ApiProperty({ description: 'Password' })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password should not be empty.' })
  @MinLength(8, {
    message: 'Password must be longer than or equal to 8 characters.',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must include at least one uppercase letter.',
  })
  @Matches(/[a-z]/, {
    message: 'Password must include at least one lowercase letter.',
  })
  @Matches(/\d/, { message: 'Password must include at least one number.' })
  @Matches(/[!@#$%^&*(),.?":{}|<>]/, {
    message: 'Password must include at least one special character.',
  })
  password: string;
}
