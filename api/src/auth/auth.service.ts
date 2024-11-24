import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { SigninDto, SignupDto } from '@/auth/dto';
import { PrismaService } from '@/prisma/prisma.service';
import { User } from '@prisma/client';
import { EmailService } from '@/email/email.service';
import { SignUpResponse } from '@/types';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private email: EmailService,
    private jwt: JwtService,
    private prisma: PrismaService,
  ) {}

  async signup(dto: SignupDto): Promise<SignUpResponse> {
    try {
      // Generate the password hash
      const hash = await this.hashData(dto.password);

      const buffer = await argon.hash(Date.now().toString(), {
        raw: true,
      });

      const emailToken = buffer.toString('hex');

      // Save the new user in the database
      const user = await this.prisma.user.create({
        data: {
          fullName: dto.fullName,
          employeeCode: dto.employeeCode,
          email: dto.email,
          password: hash,
          emailToken,
        },
      });

      // await this.email.signUp(emailToken, dto.email);

      return {
        id: user.id,
        fullName: user.fullName,
        employeeCode: user.employeeCode,
        email: user.email,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email is already registered with us.');
        }
      }

      throw error;
    }
  }

  async signin(
    dto: SigninDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // Find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // If user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Credencials incorrect');
    }

    // Compare password
    const passwordMatch = await argon.verify(user.password, dto.password);

    // If password incorrect throw exception
    if (!passwordMatch) {
      throw new ForbiddenException('Credencials incorrect');
    }

    // If user not active throw exception
    if (!user.isActive) {
      throw new ForbiddenException('You account yet to active');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async signout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: '' },
    });

    return { success: true };
  }

  async refreshTokens(user: User, refreshToken: string) {
    const matches = await argon.verify(user.refreshToken, refreshToken);

    if (!matches) {
      throw new UnauthorizedException();
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async verifyEmail(token: string) {
    // Find the user by email
    const user = await this.prisma.user.findFirst({
      select: {
        id: true,
      },
      where: {
        emailToken: token,
      },
    });

    // If user does not exist throw exception
    if (!user) {
      throw new ForbiddenException('Unable to verify email');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailToken: '',
        isEmailVerified: true,
      },
    });

    return { message: 'Email verified successfully' };
  }

  hashData(data: string) {
    return argon.hash(data);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: hashedRefreshToken },
    });
  }

  async getTokens(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessToken = await this.jwt.signAsync(
      {
        sub: userId,
        email,
      },
      {
        expiresIn: '15d',
        secret: this.config.get('JWT_ACCESS_SECRET'),
      },
    );

    const refreshToken = await this.jwt.signAsync(
      { sub: userId },
      {
        expiresIn: '1d',
        secret: this.config.get('JWT_REFRESH_SECRET'),
      },
    );

    return { accessToken, refreshToken };
  }
}
