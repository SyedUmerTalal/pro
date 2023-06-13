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
import { UserService } from 'src/user/user.service';
import { PlatePurpose } from '@prisma/client';
import PlateListingService from './services/plate-listing.service';
import PlateAuctionService from './services/plate-auction.service';
import FilterPlateInput from './inputs/filter-plate.input';
import CreateAuctionInput from './inputs/create-auction.input';

@Resolver(() => Plate)
export class PlateResolver {
  constructor(
    private readonly plateService: PlateService,
    private readonly userService: UserService,
    private readonly plateListingService: PlateListingService,
    private readonly plateAuctionService: PlateAuctionService,
  ) {}

  @Query(() => [Plate], { name: 'plates' })
  findAllPlates(
    @Args('where', { nullable: true }) filterPlateInput: FilterPlateInput,
  ) {
    return this.plateService.findAll(filterPlateInput);
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
  approveListingPlate(@Args('where') findPlateInput: FindPlateInput) {
    return this.plateService.approveListing(findPlateInput);
  }

  @Mutation(() => Plate)
  approveAuctionPlate(
    @Args('where') findPlateInput: FindPlateInput,
    @Args('data') createAuctionInput: CreateAuctionInput,
  ) {
    return this.plateService.approveAuctionPlate(
      findPlateInput,
      createAuctionInput,
    );
  }

  @ResolveField()
  user(@Parent() plate: Plate) {
    return this.userService.findOne({ id: plate.userId });
  }

  @ResolveField()
  detail(@Parent() plate: Plate) {
    if (plate.purpose === PlatePurpose.LISTING) {
      return this.plateListingService.findOne(plate.id);
    } else {
      return this.plateAuctionService.findOne(plate.id);
    }
  }
}
