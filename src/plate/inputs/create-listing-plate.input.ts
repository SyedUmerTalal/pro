import { Field, Float, InputType, OmitType } from '@nestjs/graphql';
import PlateListing from '../models/plate-listing.model';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

@InputType()
export default class CreateListingPlateInput extends OmitType(
  PlateListing,
  ['id'] as const,
  InputType,
) {
  @Field()
  @IsNotEmpty()
  @IsString()
  combination: string;

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  askingPrice: number;

  @Field()
  @IsOptional()
  @IsString()
  comments: string;
}
