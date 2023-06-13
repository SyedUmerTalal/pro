import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserInput } from './dto/user-register.input';
import { Prisma, UserStatus } from '@prisma/client';
import FilterUserInput from './dto/filter-user.input';
import FindUserInput from './dto/find-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(registerUserInput: RegisterUserInput) {
    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(
      registerUserInput.password,
      saltOrRounds,
    );

    const userCreateInput = {
      ...registerUserInput,
      password: hashedPassword,
    };

    return this.prismaService.user.create({
      data: userCreateInput,
    });
  }

  async findAll(filterUserInput: FilterUserInput) {
    return this.prismaService.user.findMany({
      where: filterUserInput,
    });
  }

  async findOne(findUserInput: FindUserInput) {
    return this.prismaService.user.findUnique({
      where: findUserInput,
    });
  }

  findApprovedOne({ ...findUserInput }: FindUserInput) {
    const userWhereInput: Prisma.UserWhereInput = {
      AND: [
        {
          OR: findUserInput,
        },
        {
          status: UserStatus.APPROVED,
        },
      ],
    };

    return this.prismaService.user.findFirst({
      where: userWhereInput,
    });
  }

  async remove(findUserInput: FindUserInput) {
    return await this.prismaService.user.delete({
      where: findUserInput,
    });
  }

  async approve(findUserInput: FindUserInput) {
    const userUpdateInput: Prisma.UserUpdateInput = {
      status: UserStatus.APPROVED,
    };

    return await this.prismaService.user.update({
      where: findUserInput,
      data: userUpdateInput,
    });
  }
}
