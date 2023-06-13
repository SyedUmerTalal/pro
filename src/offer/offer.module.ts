import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferResolver } from './offer.resolver';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [OfferResolver, OfferService, PrismaService, UserService],
})
export class OfferModule {}
