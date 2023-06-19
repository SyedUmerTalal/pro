import { Module } from '@nestjs/common';
import { PlateResolver } from './resolvers/plate.resolver';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuctionService } from 'src/auction/auction.service';
import { OfferService } from 'src/offer/offer.service';
import { PlateService } from './services/plate.service';
import { PlateController } from './plate.controller';
import PlateListingService from './services/plate-listing.service';
import PlateAuctionService from './services/plate-auction.service';

@Module({
  providers: [
    PlateResolver,
    PlateService,
    PrismaService,
    UserService,
    AuctionService,
    OfferService,
    PlateListingService,
    PlateAuctionService,
  ],
  controllers: [PlateController],
})
export class PlateModule {}
