import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserInput } from './dto/user-register.input';
import { Prisma, Status } from '@prisma/client';
import { UserDeleteInput } from './dto/user-delete.input';
import { UserApproveArgs } from './dto/user-approve.input';
import { UserFilterInput } from './dto/user-filter.input';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(registerUserInput: RegisterUserInput) {
    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(
      registerUserInput.password,
      saltOrRounds,
    );

    const userInclude: Prisma.UserInclude = {
      country: true,
      city: true,
    };

    const userCreateInput = {
      ...registerUserInput,
      password: hashedPassword,
    };

    return this.prismaService.user.create({
      include: userInclude,
      data: userCreateInput,
    });
  }

  async findAllByStatus(UserFilterInput: UserFilterInput) {
    const userInclude: Prisma.UserInclude = {
      country: true,
      city: true,
    };

    const userWhereInput: Prisma.UserWhereInput = {
      OR: [
        {
          status: UserFilterInput.status,
        },
        {
          id: UserFilterInput.id,
        },
      ],
    };

    return this.prismaService.user.findMany({
      include: userInclude,
      where: userWhereInput,
    });
  }

  async findOneByEmail(email: string) {
    const userWhereInput: Prisma.UserWhereInput = {
      AND: [
        {
          email: email,
        },
        {
          status: Status.APPROVED,
        },
      ],
    };

    return this.prismaService.user.findFirst({
      where: userWhereInput,
    });
  }

  async remove(deleteUserInput: UserDeleteInput) {
    const userInclude: Prisma.UserInclude = {
      country: true,
      city: true,
    };

    const userWhereInput: Prisma.UserWhereUniqueInput = {
      id: deleteUserInput.id,
    };

    return await this.prismaService.user.delete({
      include: userInclude,
      where: userWhereInput,
    });
  }

  async approve(userApproveArgs: UserApproveArgs) {
    const userInclude: Prisma.UserInclude = {
      country: true,
      city: true,
    };

    const userWhereUniqueInput: Prisma.UserWhereUniqueInput = {
      id: userApproveArgs.id,
    };

    const userUpdateInput: Prisma.UserUpdateInput = {
      status: Status.APPROVED,
    };

    return await this.prismaService.user.update({
      where: userWhereUniqueInput,
      include: userInclude,
      data: userUpdateInput,
    });
  }
}
