import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
  ValidateIf,
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  Min,
  IsArray,
} from 'class-validator';
import Offer from 'src/offer/object/offer.object';

@ObjectType()
export default class PlateListing {
  @Field(() => Int)
  readonly id: number;

  @Field(() => Boolean, { nullable: true })
  @ValidateIf((dto) => typeof dto.settlePrice === 'undefined')
  @IsNotEmpty()
  @IsBoolean()
  readonly isOpenForPrice?: boolean | null;

  @Field(() => Float, { nullable: true, defaultValue: 0 })
  @ValidateIf((dto) => typeof dto.isOpenForPrice === 'undefined')
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsNotEmpty()
  settlePrice?: number;

  @Field(() => [Offer])
  @IsArray()
  offers: Offer[];
}
