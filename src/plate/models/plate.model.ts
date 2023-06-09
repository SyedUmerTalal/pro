import { Field, Float, ObjectType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import PlateListing from './plate-listing.model';

@ObjectType()
export default class Plate {
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

  @Field(() => PlateListing)
  listingPlate: PlateListing;
}
