import { Field, Float, InterfaceType, registerEnumType } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import PlateListing from './plate-listing.model';
import PlateAuction from './plate-auction.model';
import { User } from 'src/user/model/user.model';
import { Status } from '@prisma/client';

@InterfaceType({
  resolveType(plate) {
    if (plate.ListingPlate?.id) {
      return PlateListing;
    } else {
      return PlateAuction;
    }
  },
  isAbstract: true,
})
export default abstract class Plate {
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

  @Field(() => Status)
  @IsEnum(Status)
  @IsNotEmpty()
  readonly status: Status;

  @Field(() => User)
  @IsNotEmpty()
  user: User;
}

registerEnumType(Status, {
  name: 'Status',
});
