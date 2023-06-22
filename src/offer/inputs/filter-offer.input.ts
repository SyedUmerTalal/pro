import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import CreateOfferInput from './create-offer.input';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

@InputType()
export default class FilterOfferInput extends PartialType(
  PickType(CreateOfferInput, ['plateListingId'] as const),
) {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  userId?: number;
}
