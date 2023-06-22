import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferResolver } from './offer.resolver';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserService } from 'src/user/user.service';
import { PlateService } from 'src/plate/services/plate.service';

@Module({
  providers: [
    OfferResolver,
    OfferService,
    PrismaService,
    UserService,
    PlateService,
  ],
  exports: [OfferService],
})
export class OfferModule {}
