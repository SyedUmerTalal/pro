import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CountryArgs } from './args/country.args';
import { Prisma } from '@prisma/client';

@Injectable()
export class CountryService {
  constructor(private readonly prismaService: PrismaService) {}

  findAll(countryArgs: CountryArgs) {
    const includeCities: Prisma.CountryInclude = {
      cities: true,
    };

    const whereCountryCode: Prisma.CountryWhereInput = countryArgs?.countryCode
      ? {
          code: countryArgs.countryCode,
        }
      : {};

    const countries = this.prismaService.country.findMany({
      include: includeCities,
      where: whereCountryCode,
    });

    return countries;
  }
}
