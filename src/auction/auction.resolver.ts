import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import Auction from './model/auction.model';
import { BidService } from 'src/bid/bid.service';

@Resolver(Auction)
export default class AuctionResolver {
  constructor(private readonly bidService: BidService) {}

  @ResolveField()
  bids(@Parent() auction: Auction) {
    return this.bidService.findAll({ auctionId: auction.id });
  }
}
