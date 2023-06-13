import { Field, InputType, Int, PartialType, PickType } from '@nestjs/graphql';
import CreateBidInput from './create-bid.input';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

@InputType()
export default class FilterBidInput extends PartialType(
  PickType(CreateBidInput, ['auctionId'] as const),
) {
  @Field(() => Int)
  @IsOptional()
  @IsNumber()
  @IsPositive()
  userId?: number;
}
