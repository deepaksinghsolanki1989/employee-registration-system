import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/auth/auth.module';
import { EmailModule } from '@/email/email.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersModule } from '@/users/users.module';
import { UserProfileModule } from '@/user-profile/user-profile.module';
import { PaintingJobsModule } from './painting-jobs/painting-jobs.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    EmailModule,
    UsersModule,
    PrismaModule,
    UserProfileModule,
    PaintingJobsModule,
    StatisticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
