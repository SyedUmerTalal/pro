import { Field, Float, InputType } from '@nestjs/graphql';
import { IsPositive, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

@InputType()
export default class CreateAuctionInput {
  @Field(() => Float, { defaultValue: 0 })
  @IsPositive()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  startingPrice: number;

  @Field(() => Date)
  @IsDate()
  @IsNotEmpty()
  endAt: Date;
}
