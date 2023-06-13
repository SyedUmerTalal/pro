import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import Offer from '../object/offer.object';
import { IsNumber, IsPositive } from 'class-validator';

@InputType()
export default class CreateOfferInput extends PickType(
  Offer,
  ['price'] as const,
  InputType,
) {
  @Field(() => Int)
  @IsNumber()
  @IsPositive()
  plateListingId: number;
}
