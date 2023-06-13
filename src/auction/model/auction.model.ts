import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsPositive, IsNotEmpty, IsDate } from 'class-validator';

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
}
