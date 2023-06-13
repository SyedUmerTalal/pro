import { Field, Float, InputType, PickType } from '@nestjs/graphql';
import Offer from '../object/offer.object';
import { OfferStatus } from '@prisma/client';
import {
  Equals,
  IsDecimal,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

@InputType()
export default class UpdateOfferInput {
  @Field(() => OfferStatus, { nullable: true })
  @IsEnum(OfferStatus)
  @IsOptional()
  status?: OfferStatus;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  counter: number;
}
