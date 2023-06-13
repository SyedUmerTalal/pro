import { InputType, PickType } from '@nestjs/graphql';
import Bid from '../model/bid.model';

@InputType()
export default class FindBidInput extends PickType(
  Bid,
  ['id'] as const,
  InputType,
) {}
