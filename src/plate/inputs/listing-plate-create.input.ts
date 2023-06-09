import { InputType, IntersectionType, OmitType } from '@nestjs/graphql';
import Plate from '../models/plate.model';
import PlateListing from '../models/plate-listing.model';

@InputType()
export default class ListingPlateCreateInput extends IntersectionType(
  OmitType(Plate, ['listingPlate'] as const),
  PlateListing,
  InputType,
) {}
