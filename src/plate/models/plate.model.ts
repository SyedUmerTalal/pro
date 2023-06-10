import {
  Field,
  Float,
  HideField,
  Int,
  InterfaceType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { User } from 'src/user/model/user.model';
import { Status } from '@prisma/client';
import { PlateUnion } from './plate.union';
import PlateListing from './plate-listing.model';
import PlateAuction from './plate-auction.model';

@ObjectType()
export default class Plate {
  @Field(() => Int)
  @IsNotEmpty()
  readonly id: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly combination: string;

  @Field(() => Float)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  readonly askingPrice: number;

  @Field()
  @IsOptional()
  @IsString()
  readonly comments: string;

  @Field(() => Status)
  @IsEnum(Status)
  @IsNotEmpty()
  readonly status: Status;

  @Field(() => User)
  @IsNotEmpty()
  readonly user: User;

  @HideField()
  readonly listingPlate: PlateListing;

  @HideField()
  readonly auctionPlate: PlateAuction;

  @Field(() => PlateUnion, { nullable: true })
  readonly detail?: typeof PlateUnion;
}

registerEnumType(Status, {
  name: 'Status',
});
