import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserResolver } from './user.resolver';
import { CityService } from 'src/common/services/city.service';
import { CountryService } from 'src/country/country.service';

@Module({
  providers: [
    UserService,
    PrismaService,
    UserResolver,
    CityService,
    CountryService,
  ],
  exports: [UserService],
})
export class UserModule {}
