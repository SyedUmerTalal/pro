import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import PlateListing from '../models/plate-listing.model';
import Plate from '../models/plate.model';

@InputType()
export default class CreateListingPlateInput extends IntersectionType(
  PickType(Plate, ['combination', 'askingPrice', 'comments']),
  PickType(PlateListing, ['isOpenForPrice', 'settlePrice']),
  InputType,
) {}
