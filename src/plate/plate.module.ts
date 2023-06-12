import { Module } from '@nestjs/common';
import { PlateService } from './plate.service';
import { PlateResolver } from './plate.resolver';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserService } from 'src/user/user.service';
import PlateListingService from './services/plate-listing.service';
import PlateAuctionService from './services/plate-auction.service';

@Module({
  providers: [
    PlateResolver,
    PlateService,
    PrismaService,
    UserService,
    PlateListingService,
    PlateAuctionService,
  ],
})
export class PlateModule {}
