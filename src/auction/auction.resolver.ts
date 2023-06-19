import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import Auction from './model/auction.model';
import { BidService } from 'src/bid/bid.service';
import CreateAuctionInput from './dto/create-auction.input';
import { AuctionService } from './auction.service';

@Resolver(Auction)
export default class AuctionResolver {
  constructor(
    private readonly auctionService: AuctionService,
    private readonly bidService: BidService,
  ) {}

  @Mutation(() => Auction)
  createAuction(@Args('data') createAuctionInput: CreateAuctionInput) {
    return this.auctionService.create(createAuctionInput);
  }

  @ResolveField()
  bids(@Parent() auction: Auction) {
    return this.bidService.findAll({ auctionId: auction.id });
  }
}
