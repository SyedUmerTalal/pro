import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import Bid from '../model/bid.model';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export default class CreateBidInput extends PickType(
  Bid,
  ['price'] as const,
  InputType,
) {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  auctionId: number;
}
