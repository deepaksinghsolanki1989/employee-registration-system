import { Controller, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '@/auth/guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AccessTokenGuard)
@ApiTags('Users')
@Controller('users')
export class UserController {}
