import {
  Field,
  Float,
  HideField,
  Int,
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
import { PlatePurpose, Status } from '@prisma/client';
import { PlateUnion } from './plate.union';
import Auction from 'src/auction/model/auction.model';

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

  @HideField()
  readonly userId: number;

  @Field(() => PlatePurpose)
  @IsNotEmpty()
  @IsEnum(PlatePurpose)
  readonly purpose: PlatePurpose;

  @Field(() => User)
  @IsNotEmpty()
  readonly user: User;

  @Field(() => PlateUnion, { nullable: true })
  readonly detail?: typeof PlateUnion;
}

registerEnumType(Status, {
  name: 'Status',
});

registerEnumType(PlatePurpose, {
  name: 'PlatePurpose',
});
