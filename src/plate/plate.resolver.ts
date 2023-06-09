import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PlateService } from './plate.service';
import ListingPlateCreateInput from './inputs/create-listing-plate.input';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import CreateAuctionPlateInput from './inputs/create-auction-plate.input';
import PlateListing from './models/plate-listing.model';
import PlateAuction from './models/plate-auction.model';
import Plate from './models/plate.model';
import UpdateStatusPlateInput from './inputs/update-status-plate.input';
import FilterPlateInput from './inputs/filter-plate.input';

@Resolver()
export class PlateResolver {
  constructor(private readonly plateService: PlateService) {}

  @Mutation(() => PlateListing)
  @UseGuards(JwtAuthGuard)
  createListingPlate(
    @Args('createListingPlateInput')
    createListingPlateInput: ListingPlateCreateInput,
    @CurrentUser('userId') userId: number,
  ) {
    return this.plateService.createListingPlate(
      createListingPlateInput,
      userId,
    );
  }

  @Mutation(() => PlateAuction)
  @UseGuards(JwtAuthGuard)
  createAuctionPlate(
    @Args('createAuctionPlateInput')
    createAuctionPlateInput: CreateAuctionPlateInput,
    @CurrentUser('userId') userId: number,
  ) {
    return this.plateService.createAuctionPlate(
      createAuctionPlateInput,
      userId,
    );
  }

  @Query(() => [Plate], { name: 'plates' })
  findAllPlates(@Args('filterPlateInput') filterPlateInput: FilterPlateInput) {
    return this.plateService.findAll(filterPlateInput);
  }

  @Query(() => Plate, { name: 'plate' })
  findOne(@Args('id') id: number) {
    return this.plateService.findOne(id);
  }

  @Mutation(() => Plate)
  updatePlateStatus(
    @Args('updateStatusPlateInput')
    updateStatusPlateInput: UpdateStatusPlateInput,
  ) {
    return this.plateService.updateStatus(updateStatusPlateInput);
  }
}
