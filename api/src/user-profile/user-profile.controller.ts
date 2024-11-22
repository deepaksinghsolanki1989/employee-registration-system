import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from '@/auth/decorator';
import { AccessTokenGuard } from '@/auth/guard';
import { ChangePasswordDto, UpdateProfileDto } from '@/user-profile/dto';
import { UserProfileService } from '@/user-profile/user-profile.service';

@UseGuards(AccessTokenGuard)
@ApiTags('User Profile')
@Controller()
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}

  @Get('user/me')
  getMe(@GetUser() user: User) {
    delete user.password;

    return user;
  }

  @Post('change-password')
  changePassword(@GetUser() user: User, @Body() dto: ChangePasswordDto) {
    return this.userProfileService.changePassword(user, dto);
  }

  @Post('update-profile')
  updateProfile(@GetUser() user: User, @Body() dto: UpdateProfileDto) {
    return this.userProfileService.updateProfile(user.id, dto);
  }
}
