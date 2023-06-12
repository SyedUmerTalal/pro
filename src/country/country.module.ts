import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryResolver } from './country.resolver';
import { PrismaService } from 'src/common/services/prisma.service';
import { CityService } from 'src/common/services/city.service';

@Module({
  providers: [CountryResolver, CountryService, PrismaService, CityService],
})
export class CountryModule {}
