import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { PrismaService } from 'src/common/services/prisma.service';
import AuctionResolver from './auction.resolver';
import { BidService } from 'src/bid/bid.service';

@Module({
  providers: [AuctionService, PrismaService, AuctionResolver, BidService],
  exports: [AuctionService],
})
export class AuctionModule {}
