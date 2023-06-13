import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import PlateAuction from '../models/plate-auction.model';
import { AuctionService } from 'src/auction/auction.service';

@Resolver(() => PlateAuction)
export default class PlateAuctionResolver {
  constructor(private readonly auctionService: AuctionService) {}

  @ResolveField()
  auction(@Parent() plateAuction: PlateAuction) {
    return this.auctionService.findOne({ plateId: plateAuction.id });
  }
}
