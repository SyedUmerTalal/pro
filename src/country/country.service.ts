import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class CountryService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(countryCode: string) {
    return this.prismaService.country.findMany({
      where: { code: countryCode },
    });
  }

  findOne(countryCode: string) {
    return this.prismaService.country.findUnique({
      where: { code: countryCode },
    });
  }
}
