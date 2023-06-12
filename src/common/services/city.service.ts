import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CityService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(countryCode: string) {
    const cityWhereInput: Prisma.CityWhereInput = {
      countryCode: countryCode || undefined,
    };

    return this.prismaService.city.findMany({
      where: cityWhereInput,
    });
  }

  findOne(cityCode: string) {
    return this.prismaService.city.findUnique({ where: { code: cityCode } });
  }
}
