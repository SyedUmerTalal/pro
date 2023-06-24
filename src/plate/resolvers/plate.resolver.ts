import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import Plate from '../models/plate.model';
import FindPlateInput from '../inputs/find-plate.input';
import { PlatePurpose } from '@prisma/client';
import FilterPlateInput from '../inputs/filter-plate.input';
import { PlateService } from '../services/plate.service';
import UpdatePlateInput from '../inputs/update-plate.input';
import PlateListingService from '../services/plate-listing.service';
import PlateAuctionService from '../services/plate-auction.service';

@Resolver(() => Plate)
export class PlateResolver {
  constructor(
    private readonly plateService: PlateService,
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
  updatePlate(
    @Args('where') findPlateInput: FindPlateInput,
    @Args('data') updatePlateInput: UpdatePlateInput,
  ) {
    return this.plateService.update(findPlateInput, updatePlateInput);
  }

  @Mutation(() => Plate)
  deletePlate(@Args('where') findPlateInput: FindPlateInput) {
    return this.plateService.delete(findPlateInput);
  }

  @ResolveField()
  async detail(@Parent() plate: Plate) {
    if (plate.purpose === PlatePurpose.LISTING) {
      return this.plateListingService.findOne(plate.id);
    } else {
      return this.plateAuctionService.findOne(plate.id);
    }
  }
}
