import { Module } from '@nestjs/common';
import { AuctionService } from './auction.service';
import { PrismaService } from 'src/common/services/prisma.service';

@Module({
  providers: [AuctionService, PrismaService],
  exports: [AuctionService],
})
export class AuctionModule {}
