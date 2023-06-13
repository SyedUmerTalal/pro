import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  IsNumber,
  IsPositive,
  IsNotEmpty,
  IsDate,
  IsArray,
} from 'class-validator';
import Bid from 'src/bid/model/bid.model';

@ObjectType()
export default class Auction {
  @Field(() => Int)
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  startingPrice: number;

  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  endAt: Date;

  @Field(() => [Bid])
  @IsArray()
  bids: Bid[];
}
