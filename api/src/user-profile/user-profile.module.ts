import { Module } from '@nestjs/common';
import { UserProfileService } from '@/user-profile/user-profile.service';
import { UserProfileController } from '@/user-profile/user-profile.controller';

@Module({
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}
