import { InputType, PickType } from '@nestjs/graphql';
import Offer from '../object/offer.object';

@InputType()
export default class FindOfferInput extends PickType(
  Offer,
  ['id'] as const,
  InputType,
) {}
