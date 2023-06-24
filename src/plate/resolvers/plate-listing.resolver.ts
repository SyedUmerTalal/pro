import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import PlateListing from '../models/plate-listing.model';
import { OfferService } from 'src/offer/offer.service';

@Resolver(PlateListing)
export class PlateListingResolver {
  constructor(private readonly offerService: OfferService) {}

  @ResolveField()
  offers(@Parent() plate: PlateListing) {
    return this.offerService.findAll({ plateListingId: plate.id });
  }
}
