import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PlateService } from './plate.service';
import ListingPlateCreateInput from './inputs/create-listing-plate.input';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import CreateAuctionPlateInput from './inputs/create-auction-plate.input';
import Plate from './models/plate.model';
import FindPlateInput from './inputs/find-plate.input';
import DeclinePlateInput from './inputs/decline-plate-input';
import ApproveListingPlateInput from './inputs/approve-listing-plate.input';
import ApproveAuctionPlateInput from './inputs/approve-auction_plate.input';

@Resolver(() => Plate)
export class PlateResolver {
  constructor(private readonly plateService: PlateService) {}

  @Query(() => [Plate], { name: 'plates' })
  findAllPlates() {
    return this.plateService.findAll();
  }

  @Query(() => Plate, { name: 'plate' })
  findOne(@Args('findPlateInput') findPlateInput: FindPlateInput) {
    return this.plateService.findOne({ findPlateInput });
  }

  @Mutation(() => Plate)
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

  @Mutation(() => Plate)
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

  @Mutation(() => Plate)
  declinePlate(
    @Args('declinePlateInput') declinePlateInput: DeclinePlateInput,
  ) {
    return this.plateService.decline({ declinePlateInput });
  }

  @Mutation(() => Plate)
  approveListingPlate(
    @Args('approveListingPlate')
    approveListingPlateInput: ApproveListingPlateInput,
  ) {
    return this.plateService.approveListing({ approveListingPlateInput });
  }

  @Mutation(() => Plate)
  approveAuctionPlate(
    @Args('approveAuctionPlateInput')
    approveAuctionPlateInput: ApproveAuctionPlateInput,
  ) {
    return this.plateService.approveAuctionPlate({ approveAuctionPlateInput });
  }

  @ResolveField()
  detail(@Parent() plate: Plate) {
    if (plate.listingPlate?.id) {
      return plate.listingPlate;
    } else {
      return plate.auctionPlate;
    }
  }
}
