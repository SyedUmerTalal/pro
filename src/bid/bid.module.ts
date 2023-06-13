import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { BidResolver } from './bid.resolver';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [BidResolver, BidService, PrismaService, UserService],
  exports: [BidService],
})
export class BidModule {}
