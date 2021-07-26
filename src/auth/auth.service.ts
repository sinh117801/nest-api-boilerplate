import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { username: loginDto.username },
    });

    const comparePassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!user || !comparePassword) {
      throw new UnauthorizedException();
    }

    const access_token = this.jwtService.sign({
      id: user.id,
      username: user.username,
    });

    return { access_token };
  }
}
