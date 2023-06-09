import { Field, Float, InputType, OmitType } from '@nestjs/graphql';
import PlateAuction from '../models/plate-auction.model';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
} from 'class-validator';

@InputType()
export default class CreateAuctionPlateInput extends OmitType(
  PlateAuction,
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
