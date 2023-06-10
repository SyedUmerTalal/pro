import { Field, Float, InputType, PartialType } from '@nestjs/graphql';
import FindPlateInput from './find-plate.input';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

@InputType()
export default class ApproveAuctionPlateInput extends PartialType(
  FindPlateInput,
) {
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
