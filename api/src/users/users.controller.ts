import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { AccessTokenGuard } from '@/auth/guard';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '@/users/users.service';

@UseGuards(AccessTokenGuard)
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    const data = await this.usersService.findAll();

    return {
      data,
      error: null,
      message: 'Employees fetched successfully.',
    };
  }

  @Get('/approve/:id')
  async approve(@Param('id') id: string) {
    await this.usersService.approve(id);
    return {
      data: null,
      error: null,
      message: 'Employee approved successfully.',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);

    return {
      data: null,
      error: null,
      message: 'Employees deleted successfully.',
    };
  }
}
