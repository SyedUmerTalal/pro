import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import PlateAuction from '../models/plate-auction.model';
import Plate from '../models/plate.model';

@InputType()
export default class CreateAuctionPlateInput extends IntersectionType(
  PickType(Plate, ['combination', 'askingPrice', 'comments']),
  PickType(PlateAuction, ['isReserve']),
  InputType,
) {}
