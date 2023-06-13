import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';

@Injectable()
export class AuctionService {
  constructor(private readonly prismaService: PrismaService) {}

  findOne({ id, plateId }: { id?: number; plateId?: number }) {
    return this.prismaService.auction.findUnique({ where: { id, plateId } });
  }
}
