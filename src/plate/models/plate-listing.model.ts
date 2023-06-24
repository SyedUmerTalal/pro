import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  Min,
  IsArray,
  IsPositive,
} from 'class-validator';
import Offer from 'src/offer/object/offer.object';

@ObjectType()
export default class PlateListing {
  @Field(() => Int)
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly id: number;

  @Field(() => Boolean, { defaultValue: false })
  @IsNotEmpty()
  @IsBoolean()
  readonly isOpenForPrice: boolean;

  @Field(() => Float, { defaultValue: 0 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsNotEmpty()
  settlePrice?: number;

  @Field(() => [Offer], { nullable: true })
  @IsArray()
  offers?: Offer[];
}
