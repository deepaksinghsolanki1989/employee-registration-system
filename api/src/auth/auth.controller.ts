import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from '@/auth/auth.service';
import { GetHeaders, GetUser } from '@/auth/decorator';
import { SigninDto, SignupDto } from '@/auth/dto';
import { AccessTokenGuard, RefreshTokenGuard } from '@/auth/guard';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'User Signup api' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
  })
  async signup(@Body() dto: SignupDto) {
    await this.authService.signup(dto);

    return {
      data: null,
      error: null,
      message: 'User created successfully.',
    };
  }

  @ApiOperation({ summary: 'User Signin api' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User login successfully',
  })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: SigninDto) {
    const data = await this.authService.signin(dto);

    return {
      data,
      error: null,
      message: 'User login successfully.',
    };
  }

  @UseGuards(AccessTokenGuard)
  @Get('signout')
  signout(@GetUser('id') userId: string) {
    return this.authService.signout(userId);
  }

  @UseGuards(AccessTokenGuard)
  @Get('user/me')
  getMe(@GetUser() user: User) {
    return {
      data: user,
      error: null,
      message: 'User fetched successfully.',
    };
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  refreshTokens(
    @GetUser() user: User,
    @GetHeaders('authorization') refreshToken: string,
  ) {
    return this.authService.refreshTokens(user, refreshToken);
  }
}
