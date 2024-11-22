import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({ description: 'Email' })
  @IsEmail()
  @IsNotEmpty({ message: 'Email should not be empty.' })
  email: string;

  @ApiProperty({ description: 'Password' })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password should not be empty.' })
  password: string;
}
