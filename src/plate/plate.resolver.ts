import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PlateService } from './plate.service';
import Plate from './models/plate.model';
import ListingPlateCreateInput from './inputs/listing-plate-create.input';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Plate)
export class PlateResolver {
  constructor(private readonly plateService: PlateService) {}

  @Mutation(() => Plate)
  @UseGuards(JwtAuthGuard)
  createListingPlate(
    @Args('listingPlateCreateInput')
    listingPlateCreateInput: ListingPlateCreateInput,
    @CurrentUser('userId') userId: number,
  ) {
    return this.plateService.createListingPlate(
      listingPlateCreateInput,
      userId,
    );
  }
}
