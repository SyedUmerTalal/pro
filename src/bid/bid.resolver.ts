import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { BidService } from './bid.service';
import Bid from './model/bid.model';
import CreateBidInput from './dto/create-bid.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import FilterBidInput from './dto/filter-bid.input';
import { UserService } from 'src/user/user.service';

@Resolver(() => Bid)
export class BidResolver {
  constructor(
    private readonly bidService: BidService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [Bid])
  findAllBids(@Args('where') filterBidInput: FilterBidInput) {
    return this.bidService.findAll(filterBidInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Bid)
  createBid(
    @Args('data') createBidInput: CreateBidInput,
    @CurrentUser('userId') userId: number,
  ) {
    return this.bidService.create(createBidInput, userId);
  }

  @ResolveField()
  user(@Parent() bid: Bid) {
    return this.userService.findOne({ id: bid.userId });
  }

  @ResolveField()
  currentBid(@Parent() bid: Bid) {
    return this.bidService.currentPrice(bid.auctionId);
  }
}
