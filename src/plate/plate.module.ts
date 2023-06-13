import { Module } from '@nestjs/common';
import { PlateService } from './plate.service';
import { PlateResolver } from './plate.resolver';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserService } from 'src/user/user.service';
import PlateListingService from './services/plate-listing.service';
import PlateAuctionService from './services/plate-auction.service';
import { AuctionService } from 'src/auction/auction.service';
import PlateAuctionResolver from './resolvers/plate-auction.resolver';
import { OfferService } from 'src/offer/offer.service';
import PlateListingResolver from './resolvers/plate-listing.resolver';

@Module({
  providers: [
    PlateResolver,
    PlateAuctionResolver,
    PlateService,
    PrismaService,
    UserService,
    PlateListingService,
    PlateAuctionService,
    AuctionService,
    OfferService,
    PlateListingResolver,
  ],
})
export class PlateModule {}
