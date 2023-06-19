import {
  Field,
  Float,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { User } from 'src/user/model/user.model';
import { PlateUnion } from './plate.union';
import { PlatePurpose, PlateStatus } from '@prisma/client';

@ObjectType()
export default class Plate {
  @Field(() => Int)
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  readonly id: number;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  readonly combination: string;

  @Field(() => Float)
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly askingPrice: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly comments?: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly numberPlate: string;

  @Field(() => PlateStatus)
  @IsEnum(PlateStatus)
  @IsNotEmpty()
  readonly status: PlateStatus;

  @Field(() => PlatePurpose)
  @IsNotEmpty()
  @IsEnum(PlatePurpose)
  readonly purpose: PlatePurpose;

  @Field(() => User)
  @IsNotEmpty()
  readonly user: User;

  @Field(() => PlateUnion, { nullable: true })
  readonly detail?: typeof PlateUnion;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  updatedAt: Date;
}

registerEnumType(PlateStatus, {
  name: 'PlateStatus',
});

registerEnumType(PlatePurpose, {
  name: 'PlatePurpose',
});
