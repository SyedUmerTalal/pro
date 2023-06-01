import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(registerUserDto: RegisterUserDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      registerUserDto.password,
      saltOrRounds,
    );

    return this.prismaService.user.create({
      data: {
        username: registerUserDto.username,
        email: registerUserDto.email,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }
}
