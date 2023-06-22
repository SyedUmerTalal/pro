import {
  Field,
  Float,
  HideField,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { OfferStatus } from '@prisma/client';
import { Expose } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import Plate from 'src/plate/models/plate.model';
import { User } from 'src/user/model/user.model';

@ObjectType()
export default class Offer {
  @Field(() => Int)
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly id: number;

  @HideField()
  userId: number;

  @HideField()
  plateListingId: number;

  @Field(() => OfferStatus)
  @IsEnum(OfferStatus)
  @IsNotEmpty()
  status: OfferStatus;

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  currentOffer: number;

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  counter: number;

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price: number;

  @Field(() => User)
  user: User;

  @Field(() => Plate, { nullable: true })
  @IsOptional()
  plate: Plate;
}

registerEnumType(OfferStatus, {
  name: 'OfferStatus',
});
