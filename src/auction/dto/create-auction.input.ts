import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import Auction from '../model/auction.model';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@InputType()
export default class CreateAuctionInput extends PickType(
  Auction,
  ['endAt'] as const,
  InputType,
) {
  @Field(() => Int)
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  plateId: number;
}
