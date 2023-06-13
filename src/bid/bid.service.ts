import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import CreateBidInput from './dto/create-bid.input';
import FilterBidInput from './dto/filter-bid.input';

@Injectable()
export class BidService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createBidInput: CreateBidInput, userId: number) {
    const lastBidPrice = await this.prismaService.bid.findFirst({
      where: { auctionId: createBidInput.auctionId },
      orderBy: { price: 'desc' },
      select: { price: true },
    });

    if (
      lastBidPrice &&
      lastBidPrice.price.greaterThanOrEqualTo(createBidInput.price)
    ) {
      throw new Error('Bid price must be greater than last bid price.');
    }

    return this.prismaService.bid.create({
      data: {
        price: createBidInput.price,
        userId: userId,
        auctionId: createBidInput.auctionId,
      },
    });
  }

  findAll(filterBidInput: FilterBidInput) {
    return this.prismaService.bid.findMany({ where: filterBidInput });
  }

  async currentPrice(auctionId: number) {
    const bid = await this.prismaService.bid.aggregate({
      _max: { price: true },
      where: { auctionId: auctionId },
    });
    return bid._max.price;
  }
}
